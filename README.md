# Emote Widget

To emote | əˈmōt | is to display emotions openly, especially while acting. But the word also has a meaning in internet history. The original internet chat tool, IRC, provided a `/me` command, which allowed IRC channel participants to share emotion.

If my name were `friendlybug80` on IRC, when I typed `/me jumps for joy`, all IRC channel participants would see

```
* friendlybug80 jumps for joy
```

The 3rd-person `* friendlybug75 jumps for joy` is an emote.

**tl;dr The emote widget (and its associated [server](https://github.com/heroku-examples/emote-server)) allows virtual event attendees watching the event stream to share their emotion with other attendees and the presenter in real time. It's a higher fidelity, virtual-only version of clapping.**

## Prerequisites

-   git
-   node
-   API server deployed or running locally https://github.com/heroku-examples/emote-server

## Installing

1. `git clone git@github.com:heroku-examples/emote-widget.git`
1. `cd emote-widget`
1. Update the `apiDomain` in `config.js` to your API server's domain.
1. `npm install`

## Running

1. `npm run dev`

## Deploying

1. `npm run build` to generate a `dist/emote.widget.iife.js` file
1. Include `emote.widget.iife.js` inside the `<head>` tags of the HTML page into which you want to embed the widget.

    ```html
    <script type="text/javascript" src="emote.widget.iife.js"></script>
    <!-- main.js can be found in the dist folder in this project -->
    ```

1. Add the `<emote-widget>` HTML element within the `<body>` of the page. It doesn't matter where within the body you put it. The widget will be absolutely positioned on the page using CSS.

    `<emote-widget talk-id="mytalk" open="true"></emote-widget>`

    1. The `talk-id` value `mytalk` is a unique string identifier for the current talk. You'll need to update this when the talk changes. See the next step for more details.
    1. Set `open` to `false` if you want to start your Widget closed
    1. Add absolute positioning to your site's CSS to adjust were it appears.

    ```css
    emote-widget {
        position: absolute;
        right: 0;
        bottom: 0;
    }
    ```

1. Write some JavaScript to update the `talk-id` attribute's value when the talk changes. This will reset the counters to zero and record future clicks toward the new `talk-id` value. The `talk-id` value can be any string, but make sure it's unique for each "segment" (e.g. talk, panel discussion, keynote, etc) of your event for which you want to uniquely capture emote events. Something like the following can be used, but you'll have to implement a way to invoke the function when the talk changes.

    ```javascript
    updatTalkId(talkId) {
        const widget = document.querySelector('emote-widget');
        widget.setAttribute('talk-id', '<NEW_TALK_ID>');
    }
    ```

## Customizing

Changing the emojis:

1. Create and export your new emoji in svg format. Ours are square, 47px x 47px.

1. Use a base64 converter on each new emoji. We used https://www.base64-image.de/

1. Copy the css the converter outputs into `Button.scss` and `animation.js` under the corresponding classes.

## 🛠 Built With

-   [Vite](https://vite.dev) to build the Web Components
-   [Anime.js](https://animejs.com) to animate the emojis