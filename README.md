# MtG React Project

This frontend project allows users to quickly and easily browse the 20,000+ unique cards from the 28 year history of the popular card game *Magic the Gathering*. Users can select mutiple sets and filter cards by color / card type and then be presented with every card matching that criteria.

![Landing Page](/public/markdown/1.png)

### Built With
This project was built using React and Redux. All styling and animations are done with CSS. No frontend styling frameworks were used (Bootstrap, Material UI, etc.) with the exceptions of **Semantic UI** (dropdown menu), **React Transition Group** (modal entrance and exit animations), and **React Lazy Load** (lazy loading of images).


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
- Currently this feature works when one, and only one set is chosen by the user.
- Custom header images made by me (the artwork is made by the original artist)
- Not all sets are supported (there are well over 100, after all), but try the following sets to see the dynamic backgrounds in action:
  - *Commander Legends*
  - *Zendikar Rising*
  - *Double Masters*
  - *Jumpstart*
  - *Ikoria: Lair of Behemoths*
  - *Commander 2020*
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

*Searchable Dropdown*
- Users can search for sets by name and make multiple set selections

<p align="center">
  <img width="806" src="/public/markdown/searchableDropdown.png">
</p>
<p align="center">
  <img width="806" src="/public/markdown/mutipleSelections.png">
</p>
 
*Animated Dual-faced Cards*
 - Cards with both a front and back are fully animated allowing the user to quickly switch between them
 
<p align="center">
  <img width="" src="/public/markdown/flipcard1Gif.gif">
</p>

