import * as React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';



function AppBar(props: any) {
  
  return (
      <MaterialAppBar position="fixed" style={{background: 'rgb(53, 53, 60)'}} >
        <Toolbar>
          <Typography type="title" color="inherit">
            Cramo - Bodar
          </Typography>
        </Toolbar>
      </MaterialAppBar>
  );
}


export default AppBar