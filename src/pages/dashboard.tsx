import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      refresh();
  }, [modalOpen])

  async function logout () {
    setLoading(true);
    try{
      await axios.post(BACKEND_URL + "/api/v1/logout", {}, {
        withCredentials: true
      });
      setTimeout(() => {
        window.location.href = "/signin";
      }, 1500)
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
      setLoading(false);
    }
  }

  return (
    <div>
      <Sidebar/>
    
    <div className='py-2 ml-64 min-h-screen bg-gray-100'>
    <CreateContentModal open={modalOpen} onClose = {() => {
      setModalOpen(false);
    }}/>

    <div className='flex justify-end gap-1 mr-3'>
      <div className={`flex items-center transition-opacity ${loading ? "opacity-50 pointer-events-none" : ""}`}>
     <Button 
     onClick={logout}
     size="sm" 
     variant="primary" 
     text={loading ? "" : "Logout"}
     startIcon={loading ? <LoadingSpinner /> : undefined}
     />
      </div>

     <Button 
     onClick={() => {
      setModalOpen(true)
     }}
     startIcon={<PlusIcon />}
     size="md" 
     variant="secondary" 
     text="Add Content"/>
    </div>
    <div className='flex flex-wrap gap-4'>
      {contents && contents.map((content) => <Card 
          key={content._id}
          contentId={content._id}
          type={content.type} 
          link={content.link}
          title={content.title || "No title"}
          />
    )}
    </div>
    </div>
    </div>
    
  )
}

const LoadingSpinner = () => (
  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">

  </div>
)

export default Dashboard
