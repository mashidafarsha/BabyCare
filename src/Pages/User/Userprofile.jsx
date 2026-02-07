import React from 'react'
import UserProfile from '../../Component/profile/UserProfile'
import UserNavbar from '../../Component/user/UserNavbar'
import Footer from '../../Component/userFooter/Footer'

function Userprofile() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <UserNavbar />
      
      {/* കണ്ടന്റ് സെന്ററിൽ വരാൻ justify-center നൽകുന്നു */}
      <main className="flex-grow flex items-center justify-center py-10">
        <UserProfile />
      </main>

      <Footer />
    </div>
  )
}

export default Userprofile