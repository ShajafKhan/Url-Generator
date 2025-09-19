# URL Generator

A simple, responsive webpage for generating personalized countdown and birthday card URLs. Enter a name and a target date to create two shareable links: one for a countdown timer and one for a digital birthday card. Each generated URL can be shortened for easy sharing.

[Click for live Preview](https://shajafkhan.github.io/Url-Generator/Pages/index.hhtml)
## Features

- 🎂 Generate a digital birthday card URL with a custom name.
- ⏳ Generate a countdown page URL targeting a specific date.
- 📅 Easy-to-use form with real-time validation for date inputs.
- 🔗 Automatically shortens generated URLs using the TinyURL API.
- 📱 Responsive and clean interface for use on any device.

## How It Works

1. **Enter your name** and the **countdown end date** (year, month, and day).
2. Click **"Generate URLs"**.
3. The app produces two links:
   - **Countdown Page URL:** Shows a countdown to the selected date with the person's name.
   - **Birthday Card Page URL:** Displays a digital birthday card with the person's name.
4. Both URLs are shortened for easy sharing.

## Usage

1. Open the `index.html` file in your browser.
2. Fill out the form with the required information.
3. Share the generated links.

## Tech Stack
- **HTML5 & CSS3** - Modern semantic markup and responsive styling
- **Vanilla JavaScript (ES6+)** - No frameworks, using modern async/await and fetch API
- **[is.gd API](https://is.gd/apishorteningreference.php)** - Primary URL shortening service with CORS support
- **[AllOrigins CORS Proxy](https://api.allorigins.win)** - Fallback proxy service for API calls
- **Progressive Enhancement** - Graceful fallback to original URLs if shortening fails

## Customization

- The base URLs for countdown and birthday card pages (`Countdown.html` and `Responsive-Birthday-Card.html`) can be changed in the script as needed.
- Styling can be customized in the `<style>` section.

## Deployment

1. Copy all files (including `Countdown.html` and `Responsive-Birthday-Card.html`) to your web server or GitHub Pages.
2. Set your base URLs in the code if your directory structure changes.
3. Open the main HTML file in a browser to use.

## Related Projects

- [Countdown](https://github.com/ShajafKhan/Countdown) — A customizable web countdown timer for events, birthdays, and more.
- [Responsive-Birthday-Card](https://github.com/ShajafKhan/Responsive-Birthday-Card) — Share an animated, interactive birthday card with personalized greetings and celebration effects.

## Contributing

Contributions and suggestions are welcome! Please open an issue or submit a pull request.

## License

This project is open-source. See the [LICENSE](LICENSE) file for details.
