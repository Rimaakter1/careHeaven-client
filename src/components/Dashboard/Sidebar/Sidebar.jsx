import React from 'react';
import OrganizerMenu from '../OrganizerMenu/OrganizerMenu';
import ParticipantMenu from '../ParticipantMenu/ParticipantMenu';
import useRole from '../../../hooks/useRole';

const Sidebar = () => {
    const [role, isLoading] = useRole()

    return (
        <div>
            {
                role === 'admin' && <OrganizerMenu></OrganizerMenu>
            }
            {
                role === 'participant' && <ParticipantMenu></ParticipantMenu>
            }
        </div>
    );
};

export default Sidebar;