## General
- [ ] Build Instructions (in README)
- [x] Design Docs
- [ ] Testing
- [ ] Error Handling
- [ ] Styling

## Workflow
- [ ] Land on application page
- [ ] Navigate to disqualification page on disqualification
- [ ] Navigate to account creation on success
- [ ] Show error message for bad request?

## Landing Page
- [ ] Form Fields
  - [ ] Auto Purchase Price (Currency)
  - [ ] Auto Make (Text)
  - [ ] Auto Model (Text)
  - [ ] User Est. Yearly Income (Currency)
  - [ ] User Est. Credit Score (Number, 300-850)
- [ ] All fields required
- [ ] Live input validation
- [ ] Input Masking
- [ ] Marketing copy (can be lorem ipsum)
- [ ] Submit/apply button
- [ ] Handle Bad Request

## New Account Page
- [ ] Form Fields
  - [ ] Username (Email)
  - [ ] Password (Password)
  - [ ] Password Validation (Password)
- [ ] All fields required
- [ ] Input validation
  - [ ] Validate passwords have 8+ chars, incl. number OR special character
  - [ ] Passwords must match


## Disqualification Page
- [ ] Disqualification message (from API call)
  - [ ] Handle Disqualification
- [ ] "Customer Service" Contact information
- [ ] Prevent going back to / refreshing form
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
- [ ] Use `useReducer` for main form to demonstrate knowledge of Redux pattern
- [ ] Success message for account creation page
  - Hide form, show success message on submission