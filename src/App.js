import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Subdivisions from './components/Subdivisions';
import Subdivision from './components/Subdivision';
import Technics from './components/Technics';
import AddTechnics from './components/AddTechnics';
import EditTechnics from './components/EditTechnics';
import ToRepairTechnics from './components/ToRepairTechnics';
import Employees from './components/Employees';
import AddEmployees from './components/AddEmployees';
import DelEmployee from './components/DelEmployee';
import EditEmployee from './components/EditEmployee';

import Repairs from './components/Repairs';
import RepairsTechnics from './components/RepairsTechnics';
import DoneRepair from './components/DoneRepair';
import RepairsEmployees from './components/RepairsEmployees';
import AddRepairsEmployees from './components/AddRepairsEmployees';

import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <NavBar/>
         <Route exact path="/" component={Home} />
         <Route exact path='/subdivisions' component={Subdivisions} />
         <Route exact path='/subdivisions/:id' component={Subdivision} />
         <Route exact path='/subdivisions/:id/technics' component={Technics} />
         <Route exact path='/subdivisions/:id/technics/add' component={AddTechnics} />
         <Route exact path='/subdivisions/:id/employees' component={Employees} />
         <Route exact path='/subdivisions/:id/employees/add' component={AddEmployees} />
         <Route exact path='/subdivisions/:id/employees/:employee_id/del' component={DelEmployee} />
         <Route exact path='/subdivisions/:id/employees/:employee_id/edit' component={EditEmployee} />
         <Route exact path='/subdivisions/:id/technics/:technics_id/edit' component={EditTechnics} />
         <Route exact path='/subdivisions/:id/technics/:technics_id/torepair' component={ToRepairTechnics} />

         <Route exact path='/repairs' component={Repairs} />
         <Route exact path='/repairs/technics' component={RepairsTechnics} />
         <Route exact path='/repairs/technics/:id/done' component={DoneRepair} />
         <Route exact path='/repairs/employees' component={RepairsEmployees} />
         <Route exact path='/repairs/employees/add' component={AddRepairsEmployees} />
      </BrowserRouter>
    );
  }
}

export default App;
