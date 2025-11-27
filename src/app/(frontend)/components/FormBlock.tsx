'use client'
import { Page } from '@/payload-types'
import { RichText } from 'node_modules/@payloadcms/richtext-lexical/dist/features/converters/lexicalToJSX/Component'
import { useState } from 'react'
import { Button } from "@/components/ui/button"

type Formsprops = Extract<NonNullable<Page['layout']>[number], { blockType: 'form' }>

type FormStale = {
  loading: boolean
  success: boolean
  error: string | null
}

export default function FormBlock({ block }: { block: Formsprops }) {
  const [formData, setFormData] = useState({})

  const [formStale, setFormState] = useState<FormStale>({
    loading: false,
    success: false,
    error: null,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!block.form || typeof block.form !== 'object') return
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    console.log('Form submitted with data:', data)

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        body: JSON.stringify({
          form: block.form.id,
          submissionData: Object.entries(data)?.map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      setFormState({
        loading: false,
        success: true,
        error: null,
      })
      ;(e.target as HTMLFormElement).reset()

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormState({
          loading: false,
          success: false,
          error: null,
        })
      }, 5000)
    } catch (error) {
      setFormState({
        loading: false,
        success: false,
        error: 'There was an error submitting the form. Please try again later.',
      })
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {typeof block?.form === 'object' && block.form?.title === 'Form-1' && (
        <div>
          <h2 style={{ marginBottom: '20px' }}>{block.heading}</h2>
          <form className="form" onSubmit={handleSubmit}>
            {block.form.fields?.map((field: any) => (
              <div key={field.name} style={{ marginBottom: '15px' }}>
                <label
                  htmlFor={field.name}
                  style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}
                >
                  {field.label}
                </label>
                <input
                  type={field.blockType}
                  name={field.name}
                  required={field.required}
                  placeholder={field.label}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </div>
            ))}
            {/* display error or success messages */}
            {formStale.error && <p style={{ color: 'red' }}>{formStale.error}</p>}
            {formStale.success ? (
              <div style={{ color: 'green', marginBottom: '15px' }}>
                <RichText data={block.form.confirmationMessage!} />
              </div>
            ) : (
              <Button variant="outline" bg-blue-500
              >
                {block.form.submitButtonLabel || 'Submit'}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  )
}
