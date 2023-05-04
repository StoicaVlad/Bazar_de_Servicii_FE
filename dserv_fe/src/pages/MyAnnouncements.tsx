import { useState } from 'react'
import { Button } from 'react-bootstrap';
import AnnouncementsByUserTable from '../components/ClientAnnouncements/AnnouncementsByUserTable';
import CreateAnnouncement from './Modals/CreateAnnouncementModal';

const MyAnnouncements = (props: any) => {

  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCloseModal = () => setShowCreateModal(false);

  return (
    <>
    {showCreateModal ? <CreateAnnouncement props={props} handleClose={handleCloseModal}/> : null}
    <Button onClick={() => setShowCreateModal(true)} style={{marginLeft:'200px', marginTop: '25px'}}>Add Announcement</Button>
    <AnnouncementsByUserTable props={props.props}/>
    </>
  )
}

export default MyAnnouncements