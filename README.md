# Frontend Challenge

Here's my submission for the frontend challenge.

Thank you for the opportunity, I had a lot of fun working on it!

https://frontend-challenge-khaki-xi.vercel.app/

I've used some images from Unsplash to add some life to the app.

Enjoy! 😊

## User experience

I chose to focus primarily on the user experience so I decided to implement a lot of cache mechanism to avoid any frustration due to the sluggishness of the API.

I’ve also focused my effort on the design and responsiveness of the pages to keep an enjoyable experience.

### Goals

- Minimal layout shift with skeletons
- Fully responsive experience
- Feedback on every action
- Minimizing loading time
- Utilizing caching mechanism

### Notes

With this API which has some rate limiting, the optimistic update seems buggy, especially when creating a new employee because I’m reverting the state on error.

For testing purpose I’ve commented this behaviour.

I’ve tagged my comments with `* INFO:` so you can play with them.

## Initial structure

I've changed the initial structure of the project to fit my needs and preferences.

I found the structure of the whole model / data to be complex with a lot of abstraction wrapping only a few lines of code, spread across several files.

In my opinion, this was adding unnecessary complexity which increased the cognitive load needed to understand and maintain the codebase.

That's why I decided to simplify the structure and keep parts that are working together in the same file.

I know there is valid reasons behind it and I would be more than happy to discuss them during an interview 🤓

## React caching

You might have noticed that I've used a fair amount of `useCallback` and `useMemo`.

There's a lot of discussions going on about their use and their performance impact, the general consensus goes towards using them only when needed and not overusing them.

From my experiments and observations, there's a general clear benefit of using them everywhere.

Although I completely agree 100% with the statement that you should never optimize prematurely and observe the bottlenecks to address only real concerns, this case is different in my opinion.

If no performance issues are present, using `useCallback` and `useMemo` will increase the processing time by less than 1ms per use and barely impact the memory usage. The time it takes to write is less than 10 seconds using code snippets.

This very small investment prevents most of the future performances issues that might arise from the app growing or even performances issues we might not be aware of because someone uses the app on a low-end device.

When not using it and a performance issue arises, you have to:
- Get alerted of the issue
- Identify the issue
- Fix the issue
- Do a round of code review
- Ship the changes

This takes a lot of time and can be avoided by using `useCallback` and `useMemo` from the start.

From an engineering perspective, I agree that it's not the best practice to use them everywhere, but from a business perspective, I don't see any reason not to.

At some point it becomes like washing your hands after going to the bathroom, it's a small investment that prevents a lot of issues.

My 2 cents on the subject ;)

## Error handling

I’ve used a toaster to simplify the error handling but I could also implement proper error components within the page to display them.

## Structure

I haven’t implemented Storybook or any unit tests, otherwise I would have regrouped components inside a folder, example:

`components/app/AddEmployeeForm/index.tsx`

`components/app/AddEmployeeForm/index.stories.tsx`

`components/app/AddEmployeeForm/index.tests.tsx`

And so on and so forth.

## Input component

As you can see, there’s a fixed space under each input to display an error message. This space stays even when there’s no error, this is intentional and it’s to avoid any layout shift.

## Overall

There’s a ton of other things I would like to add / tweak but didn't want to spend too much time:

- Slight animations with Framer Motion
- Keyboard shortcuts
- Improve the UI of the detail page
- Implement a pagination
- Improve the responsive on 4k screens
- Implement [fluid.tw](http://fluid.tw) to keep consistent font-size & margins throughout the whole spectrum of resolutions above tablet.
- Abstract some logic regarding optimistic updates
- Add storybook
- Add unit tests & integration tests (Cypress)
- Fix the ThemeSwitcher reloading on every page change

## Time tracking

I’ve spent 10 intense hours on the challenge as I found it very interesting and motivating.

There’s a lot of small things I wanted to get right which consumed a fair amount of time:

- Caching mechanisms
- Optimistic updates
- Handling empty states
- Loading states
- Picture upload
- Search & empty search convenience
- Overall design
- Dark & light themes
- Working around the rate limiting of the API

This time doesn't account for writing this doc and for thinking about the concept and brainstorming, as I did it 'in the background' while going about my day prior to writing the code for the challenge.

# Thank you!

I really enjoyed the challenge, it was a lot of fun to work on!
