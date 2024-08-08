import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Card from '../components/Card'
import {expect, describe, it} from '@jest/globals';
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Card id={1} title='bag'/>)

    const heading = screen.getByRole('heading', { level: 3 })

    expect(heading).toBeInTheDocument()
  })
})