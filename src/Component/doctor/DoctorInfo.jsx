import React from 'react'
import { TextInput,Label,Button, } from 'flowbite-react'

function DoctorInfo() {
  return (
    <div>
        <form className="flex flex-col gap-4">
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email2"
        value="Your email"
      />
    </div>
    <TextInput
      id="email2"
      type="email"
      placeholder="name@flowbite.com"
      required={true}
      shadow={true}
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password2"
        value="Your password"
      />
    </div>
    <TextInput
      id="password2"
      type="password"
      required={true}
      shadow={true}
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="repeat-password"
        value="Repeat password"
      />
    </div>
    <TextInput
      id="repeat-password"
      type="password"
      required={true}
      shadow={true}
    />
  </div>
  
  <Button type="submit">
    Register new account
  </Button>
</form>
    </div>
  )
}

export default DoctorInfo