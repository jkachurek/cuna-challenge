## General
- [ ] Build Instructions (in README)
- [x] Design Docs
- [ ] Testing
- [ ] Error Handling
- [ ] Styling

## Workflow
- [x] Land on application page
- [x] Navigate to disqualification page on disqualification
- [x] Navigate to account creation on success
- [ ] Show error message for bad request?

## Landing Page
- [x] Form Fields
  - [x] Auto Purchase Price (Currency)
  - [x] Auto Make (Text)
  - [x] Auto Model (Text)
  - [x] User Est. Yearly Income (Currency)
  - [x] User Est. Credit Score (Number, 300-850)
- [x] All fields required
- [x] Live input validation
- [x] Input Masking
- [ ] Marketing copy (can be lorem ipsum)
- [x] Submit/apply button
- [ ] Handle Bad Request

## New Account Page
- [x] Form Fields
  - [x] Username (Email)
  - [x] Password (Password)
- [x] All fields required
- [x] Input validation
  - [x] Validate passwords have 8+ chars, incl. number OR special character
  - [x] Passwords must match
- [ ] Show some sort of message when the form is submitted


## Disqualification Page
- [ ] Disqualification message (from API call?)
  - [ ] Handle Disqualification
- [ ] "Customer Service" Contact information
- [x] Prevent going back to / refreshing form
  - Allow re-entering initial route so folks can test this app easily, but refreshing DQ page should stay there

## API Call
- [x] Implement mock fetch call
- [x] Return promise-wrapped response object
  - [x] 200 w/ Disqualification message (can be lorem ipsum) if...
    - [x] Purchase price > (income * 0.2)
    - [x] Credit score < 600
  - [x] 400 (bad request) if auto purchase price > 1 million
  - [x] Otherwise, 200 w/ approval message

## Stretch Goals
- [ ] Include show/hide button for password fields
- [ ] Success message for account creation page
  - Hide form, show success message on submission
- [ ] Create generic form hook that can spit out field props and valid state and such given a list of field names and an array of warnings

## Annoyances
- [ ] Field validation error should not change horizontal margin of application form
