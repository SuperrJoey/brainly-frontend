import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Sidebar/>
    
    <div className='py-2 ml-64 min-h-screen bg-gray-100'>
    <CreateContentModal open={modalOpen} onClose = {() => {
      setModalOpen(false);
    }}/>

    <div className='flex justify-end gap-1 mr-3'>
     <Button 
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
    <div className='flex justify-normal'>
     <Card 
     type="twitter" 
     link="https://x.com/superrjoey/status/1875173793624416360"
     title="first tweet"/>

     <Card 
     type="youtube" 
     link="https://www.youtube.com/watch?v=xuaJIKUQoNA"
     title="youtube video"/>
    </div>
    </div>
    </div>
    
  )
}

export default Dashboard
