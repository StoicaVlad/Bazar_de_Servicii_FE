import { useState } from 'react'
import ServicesByUserTable from '../components/ProviderServices/ServicesByUserTable'
import { Button } from 'react-bootstrap';
import CreateService from './Modals/CreateServiceModal';

const MyServices = (props: any) => {

  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCloseModal = () => setShowCreateModal(false);

  console.log(props);
  return (
    <>
    {showCreateModal ? <CreateService props={props} handleClose={handleCloseModal}/> : null}
    <Button onClick={() => setShowCreateModal(true)}>Create Service</Button>
    <ServicesByUserTable props={props.props}/>
    </>
  )
}

export default MyServices