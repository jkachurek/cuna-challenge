Frontend Coding Challenge

## Overview
Implement a small browser-based application for pre-qualifying a potential user
for a loan. 

## Rationale
We believe the best way to get to know a potential applicant is through their code and their process. However, traditional interview whiteboard/quiz style coding challenges often place those applicants in situations where they are not comfortable or capable of producing their best work. 

By participating in this process, you will be giving us an artifact that we can review together and help us get a better feel for who you are as an engineer. It will hopefully give us insight into how you approach your work on a real world problem of the type you'd face in your day to day work, and give you a chance to communicate your ideas and processes through a piece of work you wrote in your ideal work style and environment.

We appreciate you taking the time and we look forward to both of us learning more about each other through this process.

## Code Ownership
All code produced for this challenge are wholly owned by the applicant. We have no intention to claim ownership or otherwise use this code for any purpose but evaluating you for hiring processes. You remain the sole copyright holder of this work.

## Trade-offs
We do not believe it is in your best interest to work long hours on this challenge. We don't want to waste your time or encourage a trade-off of quality for quantity.

It is both okay and expected for you to cut corners. Things like authentication and configuration can be time consuming, and often implemented with standardized, off the shelf solutions. Where relevant, it's okay to hard code values and/or add code comments to indicate your thinking and any practices which you think would be time consuming to implement.

It is okay if the solution is not highly performant or highly available, but it is useful to indicate how you would achieve this.

## Must haves
We expect all submissions to have the following:

1. __Build instructions__ - Include a simple README or other file giving clear, concise instructions on how to build/run your code.

2. __Repeatable builds__ - Any of our engineers should be able to take your submission and instructions and run them without any major, obvious issues in the expected environment.

3. __Version history__ - Version control and history is an important part of our process and we expect it to be a part of yours too. We like and prefer git.

## Nice to haves
These are recommended if you have the time:

1. __Design docs__ - Explain your thinking clearly in an overview document helps us and future readers (including yourself) better understand your thinking and your structure.

2. __Comprehensive Testing__ - We don't expect complete test coverage, but you should __*provide some tests for key, critical areas*__. This helps us see your testing strategies and what you think is critical. 

3. __Comprehensive Error Handling__ - Understanding the places where errors can be thrown and how to deal with them is an important part of this task, but we again understand that doing this completely could be time consuming. Feel free to detail errors through comments or other similar means to demonstrate your understanding.

## Gotchas
To be clear, many of the following issues will either reflect poorly or result in a no-pass from the interview team:

1. __Unstructured code/Single commit__ - We expect any results to be reflective of production quality, maintainable code. Writing the entirety of the challenge in a single file, or committing it once is not reflective of that quality standard.

2. __Scope Creep__ - An important part of professional engineering is producing a product that matches requirements. Submissions that go far beyond what is asked will reduce our ability to engage with your submission and is not a good use of your time.

3. __Re-implementing standard libraries__ - Spending your limited time writing lists, http servers, security algorithms, etc. provided by the standard library is in general a bad idea and specifically not a good use of your time. It's okay to stick to the proven software!

## Requirements
Your application should lead a user through the initial portion of qualifying for an auto loan. It should consist of a __landing page__ to collect basic info about both the car they are interested in buying and their own financial situation. Based on this, you should be able to make a __simulated network call__ that will redirect the user to either a __new account creation page__ or a __disqualification notice__.

The styling should be simple, plain but deliberate.

### Landing Page
The initial page should show a simple form with inputs for the following field:

- Auto Purchase Price (Currency)
- Auto Make (Text)
- Auto Model (Text)
- User Estimated Yearly Income (Currency)
- User Estimated Credit Score (Number from 300-850)

These fields are all required and __should validate to type__. __Provide feedback to the user__ when they wrong or missing. There should be __space for marketing copy__ (Lorum Ipsem) and __controls for moving forward__.

### New Account Page
If the api call does not return a disqualification message(see below), this page should have a simple account creation form including:

  Username (Text)
  Password (Text)

The username should be validated as an email and password should require more than 8 characters and a number or special character. Ensure the user types their password twice to validate their intent.

### Disqualification Page
Display a simple page with __the disqualification message that comes from the api call__ as well as __fake information to get in contact with a customer service__. There should be __no further way to get off this page__ or re-enter the information.

### API call
You should implement a mock fetch call for your backend communication. This call should have the same interface as the real fetch and return a promise wrapped response object. The response should return disqualify message (Lorum Ipsem is fine) if the purchase price is more than 1/5th of the income or their estimated credit is below 600. Otherwise it should return a positive qualification flag. A `Bad Request` response should be returned for any auto purchase price above $1,000,000.

## Technologies
We encourage you to use those technologies you are most comfortable with. However, the primary tools you'll be expected to use at this job are __modern React/Redux with Typescript__. Displaying familiarity with these is useful and encouraged. Solutions that stray too far will not be considered.

## Questions
If you have any questions on the task presented here, we encourage you to reach out to you representative and we will strive to get you answers in a timely fashion.

Thank you for your interest and taking the time to complete this. We know your time is valuable and we hope this experience helps both sides get a sense of the other in a quicker, more efficient manner.