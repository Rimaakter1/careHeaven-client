import React from 'react';
import OrganizerMenu from '../OrganizerMenu/OrganizerMenu';
import ParticipantMenu from '../ParticipantMenu/ParticipantMenu';

const Sidebar = () => {
    return (
        <div>
            <OrganizerMenu></OrganizerMenu>
            <ParticipantMenu></ParticipantMenu>
        </div>
    );
};

export default Sidebar;