# Todo list I created a while back adapted to use react

Still todo

- views
- sort
- filter
- drag and drop
- backend

Random Notes

- eventually use draft js for notes section
- drag or click styling
- index file for exporting properties
- when a new property is added all the todos need to be updated
- notes hold a value and html?
- depending on hov i do labels may run into problem with hover
- prevent paste maybe - oncopy="return false" oncut="return false" onpaste="return false">
- for properties -> inline style and just get properties count for the repeat
- view uses router (so does each todo but idk if necessary)
- may be better to use z-index for controlling clicks off popup and sidebar (if something needs to be closed etc) but for now just using state (main-context: line 68)
- property is upper case (not guaranteed) and is being converted to lowercase in the custom hooks. Probably a bad way to do this
- popup positioning is meh

Currently

- main content hook
- add properties to state
- when add property make sure it is added to todo 'constructor' as well
- fix tab bs

- use useContext for now but I think this is bad and dumb and all the data should just be backend idk
