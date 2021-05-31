# MtG React Project

This frontend project allows users to quickly and easily browse the 20,000+ unique cards from the 28 year history of the popular card game *Magic the Gathering*. Users can select mutiple sets and filter cards by color / card type and then be presented with every card matching that criteria

![Landing Page](/public/markdown/homepage1.png)
<br />

See the live website [here](https://mtgreactproject.netlify.app/).

### Built With
This project was built using React and Redux. All styling and animations are done with CSS. No frontend styling frameworks were used (Bootstrap, Material UI, etc.) with the exceptions of **Semantic UI** (dropdown menu), **React Transition Group** (modal entrance and exit animations), and **React Lazy Load** (lazy loading of images)


##### Full List of Libraries Used
- React 
- Redux
- Redux Thunk
- Semantic UI
- React Transition Group
- React Lazy Load


### API Used
MtG React Project uses the [Scryfall API](https://scryfall.com/docs/api) from [Scryfall.com](https://scryfall.com/)


### Features
*Dynamic Background Images*
- Background images change automatically based on the set users select
- Currently this feature works when one, and only one set is chosen by the user
- Custom header images are made by me (the artwork is made by the original artist)
- Not all sets are supported (there are well over 100, after all), but try the following sets to see the dynamic backgrounds in action:
  - *Commander Legends*
  - *Zendikar Rising*
  - *Double Masters*
  - *Jumpstart*
  - *Ikoria: Lair of Behemoths*
  - *Commander 2021*
  - *Theros Beyond Death*
  - *Throne of Eldraine*
  - *Core Set 2020*
  - *Modern Horizons*
  - *War of the Spark*
  - *Aether Revolt*
  - *Kaladesh*

<p align="center">
  <img width="" src="/public/markdown/dynBackgroundGif2.gif">
</p>
<br />

*Searchable Dropdown*
- Users can search for sets by name and make multiple set selections

<p align="center">
  <img width="806" src="/public/markdown/searchableDropdown.png">
</p>
<p align="center">
  <img width="806" src="/public/markdown/multipleSelections.png">
</p>
<br />

*Animated Dual-faced Cards*
 - Cards with both a front and back are fully animated allowing the user to quickly switch between them
 
<p align="center">
  <img width="" src="/public/markdown/flipcard1Gif.gif">
</p>
<br />

*Card Modal* <br />
A modal pops up when a card is clicked. The modal includes:
- Up to date pricing information
- Errata'd card text (the text in the card image may no longer be accurate)
- Links to the same card at other prominent Magic websites and marketplaces

<p align="center">
  <img width="" src="/public/markdown/modal.png">
</p>
<br />

*Mobile Responsive* 
<br />
<p align="center">
  <img width="" src="/public/markdown/mobileGif.gif">
</p>
<br />

*Lazy Loaded Images*
- Images are only loaded as needed as the user scrolls down the page
<br />

Checkout all these features on the live website [here](https://mtgreactproject.netlify.app/)
<br />

### Open Work
Modal
- The modal currently accomodates 99.99% of cards. A few of the wordier, dual faced cards (cards with both a front and back) do have trouble fitting on the modal. This needs to be addressed

### What I Would do Differently
This was my first major React project. I started it while first learning React and kept working on it as I learned React and Redux. If I were to start from scratch with the knowledge I have now I would:
- Make better and more frequent use of the global state in Redux and less use of local state
- Refactor the actions associated with Redux to make them more effecient and cleaner
- Make many of the components functional components or hooks instead of class based components
- Migrate to a frontend styling framework like Bootstrap or similar to make the styling easier and eliminate the need for so many CSS files


