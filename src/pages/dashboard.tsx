import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

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
    <div className='flex gap-4'>
      {contents.map(({type, link, title}) => <Card 
          type={type} 
          link={link}
          title={title}
          />
    )}
    </div>
    </div>
    </div>
    
  )
}

export default Dashboard
