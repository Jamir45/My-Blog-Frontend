const { makeStyles } = require("@material-ui/core");

const useStyles = makeStyles((theme) => ({
   root: {
     display: 'flex',
     flexWrap: 'wrap',
   },
   margin: {
     margin: theme.spacing(1),
   },
   withoutLabel: {
     marginTop: theme.spacing(3)
   },
   textField: {
     width: '100%',
   },
 }));

export default useStyles;