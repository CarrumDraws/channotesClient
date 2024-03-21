You GET note's data via only websocket calls.

So all edits via the NOTES panel must have the most up-to-date delta, or else it could mess things up...

You should seperate the text and title from the other options of the notes so they can be updated independantly wihtout the need of a delta.

-- Changes

You now have to change the title by changin the text in the textbox.

For future changes, I think it would be best if the text for a given note is completely seperate from other data in the note.

Questions: What is the "quill" object? does it trigger useEffect when i edit the contents of the editor?