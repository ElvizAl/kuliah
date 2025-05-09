"use client"
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'


export const LoginButon = () => {
    const {pending} = useFormStatus();

  return (
    <Button type="submit" className='w-full cursor-pointer'>{pending ? 'Logging in...' : 'Login'}</Button>
  )
}


export const RegisterButon = () => {
    const {pending} = useFormStatus();

  return (
    <Button type="submit" className='w-full cursor-pointer'>{pending ? 'Registering...' : 'Register'}</Button>
  )
}
