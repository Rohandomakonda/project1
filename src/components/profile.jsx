import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link as RouterLink } from 'react-router-dom'; // Assuming you are using React Router

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component={RouterLink} // Use RouterLink if you're using React Router
      to={props.href || '#'}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Prevent default navigation if it's same-page navigation
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected ? 'page' : undefined}
      sx={{
        color: 'white', // Make text color white
        '&.Mui-selected': {
          color: 'white', // Ensure selected tab text is also white
        },
        '&:hover': {
          color: 'white', // Ensure hover color is also white
        },
      }}
      {...props}
    />
  );
}

export default function Profile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: 20 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
        sx={{
          backgroundColor: 'green', // Set background color to green
          color: 'white', // Set default text color to white for Tabs
          '& .MuiTab-root': {
            color: 'white', // Ensure text color is white for all tabs
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'white', // Optional: Change the indicator color to white
          },
        }}
      >
        <LinkTab label="Saved Events" href="/getallsavedevents" selected={value === 0} />
        <LinkTab label="Favourite Events" href="/getalllikedevents" selected={value === 1} />
      </Tabs>
    </Box>
  );
}
