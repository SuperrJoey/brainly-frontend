import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();

  useEffect(() => {
      refresh();
  }, [modalOpen])

  const handleBrainShare = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
        share: true
      }, {
        headers : {
          "Authorization" : localStorage.getItem("token")
        }
      });
      if (response.data.shareLink) {
        const shareUrl = `http://localhost:5173${response.data.shareLink}`;
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch (error) {
      console.error("Failed to share brain:", error);
    }
  };

  return (
    <div>
      <Sidebar/>
    
    <div className='py-2 ml-64 min-h-screen bg-gray-100'>
    <CreateContentModal open={modalOpen} onClose = {() => {
      setModalOpen(false);
    }}/>

    <div className='flex justify-end gap-1 mr-3'>
     <Button 
     onClick={handleBrainShare}
     startIcon={<ShareIcon />} 
     size="sm" 
     variant="primary" 
     text="Share Brain"/>

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

export default Dashboard
