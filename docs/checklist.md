## General
- [ ] Build Instructions (in README)
- [x] Design Docs
- [ ] Testing
- [x] Error Handling
- [x] Styling

## Workflow
- [x] Land on application page
- [x] Navigate to disqualification page on disqualification
- [x] Navigate to account creation on success
- [x] Show error message for bad request?

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
- [x] Marketing copy (can be lorem ipsum)
- [x] Submit/apply button
- [x] Handle Bad Request

## New Account Page
- [x] Form Fields
  - [x] Username (Email)
  - [x] Password (Password)
- [x] All fields required
- [x] Input validation
  - [x] Validate passwords have 8+ chars, incl. number OR special character
  - [x] Passwords must match
- [x] Show some sort of message when the form is submitted


## Disqualification Page
- [x] Disqualification message
  - [x] Handle Disqualification
- [x] "Customer Service" Contact information
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
- [ ] Add loading state to forms to prevent duplicate form submission
- [ ] Include show/hide button for password fields
- [x] Success message for account creation page
- [x] Create generic form hook that can spit out field props and valid state and such given a list of field names and an array of warnings
