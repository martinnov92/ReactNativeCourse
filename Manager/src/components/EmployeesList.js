import React from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { employeesFetch } from '../actions';
import EmployeeListItem from './EmployeeListItem';

class EmployeesList extends React.Component {
    constructor() {
        super();

        this.createDataSource = this.createDataSource.bind(this);
    }

    componentWillMount() {
        // funkce, pro sledování změny dat na firebase
        // async request
        this.props.employeesFetch();

        this.createDataSource({ employees: this.props.employees });
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource({ employees: nextProps.employees });
    }

    // helper fn pro aktualizaci ListView při každém doručení nových props a hned i při mountování
    createDataSource({ employees }) {
        // 1. přidat DataSource pro ListView
        const ds = new ListView.DataSource({
            // kontrola změněných řádků v ListView (aby se vykreslilo jen to co jde vidět na obrazovce a ne i ostatní řádky)
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        // 2. uloží rows .cloneWithRows očekává array, employees je object => musím předělat do pole
        this.dataSource = ds.cloneWithRows(employees);
    }

    // 3. vykreslení jednotlivých řádků
    // employee => navrácený object
    renderRow(employee) {
        return <EmployeeListItem employee={employee} />;
    }

    render() {
        return (
            <ListView
                // issue s react-native?
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        )
    }
}

const mapStateToProps = (state) => {
    // val => employee model
    // uid => employee key (na objectu)
    const employees = _.map(state.employees, (val, uid) => {
        // převede objekt objektů na pole objektů
        // do každého objectu předá jeho vlastní key jako uid, abych neztratil ID uživatele
        // ÚŽASNÉ!!
        return { ...val, uid };
    });

    return {
        employees
    };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeesList);
