import React from 'react'
import UserProfile from '../../Component/profile/UserProfile'
import MedicalHistory from '../../Component/profile/MedicalHistory'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'

function Userprofile() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <UserNavbar />
      
      {/* കണ്ടന്റ് സെന്ററിൽ വരാൻ justify-center നൽകുന്നു */}
      <main className="flex-grow flex flex-col items-center py-10 w-full px-4 animate-fade-in">
        <div className="w-full animate-slide-up">
          <UserProfile />
        </div>
        <div className="w-full animate-slide-up delay-300">
          <MedicalHistory />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Userprofile