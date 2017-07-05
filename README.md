**[First of all, check the preview right here. Hope you love it. :)](https://stanleysathler.github.io/sth-select/example/)**

---
## :fire: What is the `sth-select`?
A select component built on top of jQuery optimized for mobile platforms.

#### What you mean with "optimized for mobile platforms"?
Most of custom select components do not have a good usability on mobile devices. Although many mobile browsers today implement a "native modal" alternative, native selects still look bad in desktop browsers. Also, sometimes, does not work well when there is not free space available in the screen.

#### How does the `sth-select` solve the problem?
After click on the select component, it opens up a little section from the bottom of the screen. This behaviour fits well both on big screens or small ones (mobile devices).

#### Damn it, homie! Now you made me excited!
Of course you are! This component is awesome!

---
## :fire: Installation instructions
We are currently working on some improvements before make it available on services such as NPM, Yarn and Bower. But for now, if you want to test it, you can download the files available in `/dist` directory.

---
## :fire: How can I use it? Please, help me!
Wait, little grasshopper. We are not going to leave you in the lurch after made you excited with this awesome component.

### HTML API
Creating a simple component just requires you add the `sth-select` attribute to your tag:
```html
<select sth-select></select>
```

Also, you can add a **title** which appears on your select's popup:
```html
<select
	sth-select
	sth-select-title="A title"
></select>
```

You might want to add a **placeholder** to your select when no item is selected.
```html
<select
	sth-select
	sth-select-placeholder="A placeholder"
></select>
```

Sometimes, you have a lot of items and want to be able to **search** by them. **But be aware:** we have not the best search algorithm yet.
```html
<select
	sth-select
	sth-select-filter="true"
></select>
```

Oh, and almost forgot: the filter field can also has a custom placeholder:
```html
<select
	sth-select
	sth-select-filter-placeholder="Search for an item"
></select>
```
