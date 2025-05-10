import AdminHallList from "../components/admin_hall_list";
import AdminDashboardSidebar from "../components/admin_dashboard_sidebar";

function AdminHallListingPage(props){
    // console.log(props);
    
    return (
        <div className="flex flex-col md:flex-row">
            <AdminDashboardSidebar 
                data={props.data}
                changeRefreshState={props.changeRefreshState} />
            <AdminHallList />
        </div>
    );
    
}

export default AdminHallListingPage;