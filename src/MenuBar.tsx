import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const MenuBar = () => {
  const testUser: string = 'Jeff Sinclair';

  return (
    <div className="menubar">
      <div className="menubar-arrows">
        <ArrowBackIosIcon className="menubar-arrows__back" />
        <ArrowForwardIosIcon className="menubar-arrows__forward" />
      </div>
      <div className="menubar-user">
        <div className="menubar-user__avatar">
          <AccountCircleIcon />
        </div>
        <div className="menubar-user__username">{testUser}</div>
      </div>
    </div>
  );
};
export default MenuBar;
