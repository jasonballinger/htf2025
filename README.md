# DailySpeak

Hack the Flagship 2025 - Team #3 - [Pitch Deck](https://docs.google.com/presentation/d/1hvJDu0g7-h4w9fnz6fUpDMGxk-fEdORRsglxp84uRZ4/edit?usp=sharing)

Jason Ballinger, William Bittner, Sydney Lenski, Isabel Metzdorff, Trevor Harms, Haasil Pujara

## Notes

The ordering food scenario is the only one that has been fully developed and tested. I recommend selecting this scenario when using the application.

This project requires an OpenAI API Key to run, and utilizes the OpenAI Realtime API (beta). This may incur significant costs if used extensively. [Here are instructions](https://community.openai.com/t/how-to-set-billing-limits-and-restrict-model-usage-for-a-project-via-openai-api/1087771) on how to setup a **spend limit** in your OpenAI API Console.

## Instructions

0. Install git, npm/pnpm

    Download git [here](https://git-scm.com/downloads), and npm [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). This project is setup to use [pnpm](https://pnpm.io/installation), but it is by no means necessary. If you already have these installed you can skip this step.

1. Clone repository

    Open a terminal window and run:

    ```sh
    git clone https://github.com/jasonballinger/htf2025.git
    ```

2. Install dependencies

    1. First, move into the directory: `cd htf2025`

    2. Then, install dependencies using `npm i` or `pnpm i`

3. Set environment variables

    The server requires an OpenAI API key to run. [Here are instructions](https://arc.net/l/quote/hniitbjz) on how to obtain an OpenAI API key. Once you have obtained an OpenAI API key:

    1. Navigate to the backend folder: `cd apps/backend`
    2. Create a new `.env` file
    3. Set the environment variable: `OPENAI_API_KEY=<Your OpenAI API Key here>`
    4. Save the `.env` file.

4. Start development server

    1. Navigate back to root of the repository: `cd ../..` - This step is important so that you start both the frontend and backend applications simulatenously. If you don't navigate back you will only start the backend.
    2. Start the development server by running `npm run dev` or `pnpm dev`
    3. You should now be able to access the app in your browser at [http://localhost:5173](http://localhost:5173)
    4. If you are encountering an error where the session is not starting, you may need to manually enable microphone permissions. This process varies by browser, but here is the process for Chrome or Chrome-based browsers:

        1. Navigate to browser settings
        2. Search **"permissions"**
        3. Click **"Site settings"**
        4. Under **Recent activity**, select **localhost**
        5. Under **Microphone**, select **Allow**
        6. Refresh the app, it should work now
