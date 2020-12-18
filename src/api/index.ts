import { ApplicationFormData, NewAccountForm } from '../types'
import blobify from '../util/blobify'
/*
  This file simulates the responses from an actual API using the Response class.
  When it is consumed, it should be used in (almost) the exact same way as the fetch API
*/

// randomly return number in a range for a ms timeout
const randomTimeout = (min: number, max: number) => {
  return Math.floor((Math.random() * (max - min)) + min)
}

export const submitApplication = (payload: ApplicationFormData): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.price > 1000000) {
        reject(new Response(null, {
          status: 400,
          statusText: 'Loans over 1 million dollars not available'
        }))
      } else {
        const creditTooLow = payload.creditScore < 600
        const loanTooHigh = payload.price > (payload.income * 0.2)
        const initSuccess: ResponseInit = {
          status: 200,
          statusText: 'Preapproval form successfully submitted'
        }
        if (creditTooLow || loanTooHigh) {
          resolve(new Response(blobify({ preapproved: false }), initSuccess))
        } else {
          resolve(new Response(blobify({ preapproved: true }), initSuccess))
        }
      }
    }, randomTimeout(500, 1500))
  })
}

export const createAccount = (payload: NewAccountForm): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Response(null, {
        status: 200,
        statusText: 'Account successfully created'
      }))
    }, randomTimeout(500, 1500))
  })
}
