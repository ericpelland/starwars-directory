# starwars-directory
To run 'python -m SimpleHTTPServer 8000'

## Project Info
* Angular 1.X required, I used 1.7.2
* UI Framework required, I used Bootstrap v3.3.7
* Display a paginated list for each available category.
* Works on any device/screen size.
* Network + API failures are caught and an error displayed.
* Spinners and loading text that improves the UX when waiting.
* Simple implementation of a translation filter/pipe allowing for different forms of communication.
* Included all root categories from the api, and linked within them.

## Project
Create a Galactic Directory of people in the Star Wars universe using the Star Wars API (yeah, that's a thing. https://swapi.co/). It should be based on Angular 1.x and use the UI framework of your choice (Bootstrap, Angular Material, etc). You can design the UX interaction and layout however you wish, but the application should meet the following requirements in an intuitive way:
* Displays a paginated list of people, with some brief details for each.
* Allows a person to be selected, and displays more detailed information about them.
* Works well on any device/screen size.
* Tolerant of errors due to API failure, network lag/timeout, etc.

## Also demonstrate:
* How to make two different angular components communicate/share a single model?
* Like be able to click an item/object in one pane and be able to edit them on a right panel control.
* How to handle the async request to the back end and give user feedback that it is working?
* If two components need the same api model, how do they get it without making two api calls to the back end if they are on the same page?

## Bonus points:
* Someday we might need to translate this into at least 6 million different forms of communication. How can we architect this front-end application to be ready for that?
* We have big plans for this directory to maybe include ships, planets and more. We don't have time for all of that right now, but should design the application so we're ready to expand its capabilities when we're ready.
* Not everyone is on a planet with solid network connectivity, but fortunately modern browsers can store information locally for offline usage. How can we accomplish that with our web application?
