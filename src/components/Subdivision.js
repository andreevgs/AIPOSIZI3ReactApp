import React from 'react';
import {Link, withRouter, useParams} from 'react-router-dom';

const Subdivision = () => {
    let {id} = useParams();
    return (
        <main role="main" class="container">
            <div class="jumbotron">
                <div>
                    <Link to={'/subdivisions/' + id + '/technics'}>Техника</Link>
                </div>
                <div>
                    <Link to={'/subdivisions/' + id + '/decom'}>Списанная техника</Link>
                </div>
                <div>
                    <Link to={'/subdivisions/' + id + '/employees'}>Сотрудники</Link>
                </div>
            </div>
        </main>
    );
}

export default withRouter(Subdivision);