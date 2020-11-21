# OS X Contact

You can test at: https://aalencar.github.io/os-x-contacts/

## Features
- Categorization of contacts by name
- Add contact
- Edit contact
- Delete contact

## Additional features that could be added

- Ascending and descending sorting of contacts
- Search field for contact list
- Mask form fields, e.g. phone
- Form fields validation
- Form validation messages
- Scroll to newly added contact
- Visually indicate which contact has been deleted
- Cancel button for adding and editing
- Toast after contact has been created, edited or deleted
- Confirmation for delete

## Development process

Before touching any code I first analyzed and broke down the components following the
Separantion of Concerns principle. I noticed there are some missing features (which I mentioned in the section above),
but I chose to stick with the basic operations and not add anything that wasn't listed as required.

In a real case scenario I would notify the manager about these possible improvements and whether or not we should proceed with it.

For the mocked data I used https://mockapi.io/ to generate 100 contacts and then moved to a json file.

After developing the functionality I jumped to styling. For the font I couldn't find the one used on the design.
I tried to use to online services which recognizes fonts based on a screenshot but it only found fonts you have to pay to use.

## Solutions at code-level

- stream-based (chosen one)
  - centralized state management with data-sharing service
  - async, relies mostly on BehaviorSubjects
  - reactive, consumers only need to notify the service about the operations and listen for the state changes
  - scalable, new UI components could start to listen for the same states without much change in other components
  - pertinent for a real case scenario where real APIs would be fetched

- events-up-props-down / smart-dump components pattern
  - started with this solution delegating state management and operations to parent/container
  - it started to get messy as more UI state had to be passed around 

- single-component
  - sync
  - relies only on Angular change detection
  - concise
  - easier to follow
  - doesn't scale
  - I considered this solution but then I realized I could come off as a developer that doesn't know how to
    structure the relationship between components
