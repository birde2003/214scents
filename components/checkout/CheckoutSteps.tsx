'use client'

import { cn } from '@/lib/utils'

interface CheckoutStepsProps {
  currentStep: number
}

const steps = [
  { number: 1, label: 'Customer Details' },
  { number: 2, label: 'Payment' },
  { number: 3, label: 'Confirmation' },
]

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all',
                  currentStep >= step.number
                    ? 'bg-primary text-background'
                    : 'bg-background-secondary text-gray-400 border-2 border-gray-600'
                )}
              >
                {currentStep > step.number ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  'mt-2 text-sm font-medium',
                  currentStep >= step.number ? 'text-primary' : 'text-gray-400'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-1 flex-1 mx-4 transition-all',
                  currentStep > step.number ? 'bg-primary' : 'bg-gray-600'
                )}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
