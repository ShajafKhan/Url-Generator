async function shortenUrl(longUrl) {
    const shorteners = [
        {
            name: 'is.gd',
            url: `https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`,
            validate: (response) => response.startsWith('https://is.gd/') && !response.includes('Error')
        },
        {
            name: 'is.gd-proxy',
            url: `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`)}`,
            validate: (response) => response.startsWith('https://is.gd/')
        }
    ];

    for (const shortener of shorteners) {
        try {
            console.log(`Trying ${shortener.name}...`);
            const response = await fetch(shortener.url);

            if (response.ok) {
                const shortUrl = await response.text();
                if (shortener.validate(shortUrl.trim())) {
                    console.log(`${shortener.name} succeeded`);
                    return shortUrl.trim();
                }
            }
        } catch (error) {
            console.warn(`${shortener.name} failed:`, error);
        }
    }

    console.log('All shorteners failed, using original URL');
    return longUrl;
}

function copyToClipboard(elementId, event) {
    const element = document.getElementById(elementId);
    const url = element.textContent;

    navigator.clipboard.writeText(url).then(() => {
        const copyBtn = event.target;
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#28a745';

        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);

        const range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const monthErrorMsg = document.getElementById('monthErrorMsg');
    const dayErrorMsg = document.getElementById('dayErrorMsg');
    const dateErrorMsg = document.getElementById('dateErrorMsg');
    const form = document.getElementById('urlGeneratorForm');
    const submitButton = form.querySelector('button[type="submit"]');

    yearInput.value = new Date().getFullYear();

    function validateDate() {
        const year = parseInt(yearInput.value) || 0;
        const month = parseInt(monthInput.value) || 0;
        const day = parseInt(dayInput.value) || 0;

        let isValid = true;

        monthErrorMsg.style.display = 'none';
        dayErrorMsg.style.display = 'none';
        dateErrorMsg.style.display = 'none';

        if (month < 1 || month > 12) {
            monthErrorMsg.style.display = 'block';
            isValid = false;
        }

        if (year >= 2025 && month >= 1 && month <= 12) {
            const daysInMonth = new Date(year, month, 0).getDate();
            if (day < 1 || day > daysInMonth) {
                const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
                dayErrorMsg.textContent = `Enter a valid day (1-${daysInMonth}) for ${monthName} ${year}.`;
                dayErrorMsg.style.display = 'block';
                isValid = false;
            }
        }

        if (year && month && day && isValid) {
            const selectedDate = new Date(year, month - 1, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate <= today) {
                dateErrorMsg.style.display = 'block';
                isValid = false;
            }
        }

        return isValid;
    }

    [yearInput, monthInput, dayInput].forEach(input => {
        input.addEventListener('input', validateDate);
        input.addEventListener('blur', validateDate);
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (!validateDate()) {
            return;
        }

        const name = document.getElementById('name').value.trim();
        if (!name) {
            alert('Please enter a name');
            document.getElementById('name').focus();
            return;
        }

        document.getElementById('loadingMsg').classList.remove('hidden');
        document.getElementById('successMsg').style.display = 'none';
        document.getElementById('warningMsg').style.display = 'none';
        document.getElementById('generatedUrls').classList.add('hidden');
        submitButton.disabled = true;
        submitButton.textContent = 'Generating...';

        const year = yearInput.value;
        const month = monthInput.value.padStart(2, '0');
        const day = dayInput.value.padStart(2, '0');
        const endDate = `${year}-${month}-${day}T00:00:00`;

        const countdownBaseUrl = 'https://shajafkhan.github.io/Countdown/Pages';
        const birthdayCardBaseUrl = 'https://shajafkhan.github.io/Responsive-Birthday-Card/Pages';

        const birthdayCardUrl = `${birthdayCardBaseUrl}?n=${encodeURIComponent(name)}`;
        const countdownUrl = `${countdownBaseUrl}?end-date=${encodeURIComponent(endDate)}&n=${encodeURIComponent(name)}&birthday-card-url=${encodeURIComponent(birthdayCardUrl)}`;

        try {
            const [shortCountdownUrl, shortBirthdayCardUrl] = await Promise.all([
                shortenUrl(countdownUrl),
                shortenUrl(birthdayCardUrl)
            ]);

            document.getElementById('countdownUrl').href = shortCountdownUrl;
            document.getElementById('countdownUrl').textContent = shortCountdownUrl;
            document.getElementById('birthdayCardUrl').href = shortBirthdayCardUrl;
            document.getElementById('birthdayCardUrl').textContent = shortBirthdayCardUrl;

            const wasShortened = shortCountdownUrl.includes('is.gd') || shortBirthdayCardUrl.includes('is.gd');
            if (wasShortened) {
                document.getElementById('successMsg').style.display = 'block';
            } else {
                document.getElementById('warningMsg').style.display = 'block';
            }

            document.getElementById('generatedUrls').classList.remove('hidden');

        } catch (error) {
            console.error('Error generating URLs:', error);
            alert('There was an error generating the URLs. Please try again.');
        } finally {
            document.getElementById('loadingMsg').classList.add('hidden');
            submitButton.disabled = false;
            submitButton.textContent = 'Generate URLs ';
        }
    });
});
