import { Injectable, forwardRef, Inject } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare var window: any;
const SQL_DB_NAME = 'liquor_emperor.db';

@Injectable()
export class DatabaseService {
    databaseObj: SQLiteObject;

    readonly database_name: string = "liquor_emperor.db";
    database = null;
    tables_data: string[];
    userInfo
    dbInstance: any;
    public database_instance: any;
    branchCode: string
    initDatabase = new Subject<string>()
    updateingMasterData = new Subject<boolean>()
    //@Inject(forwardRef(() => MasterDataService)) private masterData: MasterDataService
    constructor(private sqlite: SQLite, private platform: Platform, private sqlitePorter: SQLitePorter, private http: HttpClient) {
        //this.database = window.openDatabase(this.database_name, '1.0', 'database', 5 * 1024 * 1024);
        // this.init()

    }



    async createDB(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sqlite.create({
                name: SQL_DB_NAME,
                location: 'default'
            })
                .then(async (db: SQLiteObject) => {
                    this.databaseObj = db;
                    await this.createTableWithSql();
                    await this.createTable();

                })
                .catch(e => {
                    console.log("error " + JSON.stringify(e))
                });
        });

    }

    async createTable(): Promise<any> {
        for (var i = 0; i < this.tables_data.length; i++) {
            try {
                let dbtable = await this.database_instance.executeSql(new Query(this.tables_data[i]))

            } catch (error) {
                console.log("error " + JSON.stringify(error))
            }

        }
    }


    async init() {
        let db: any;
        if (this.platform.is('ios') || this.platform.is('android')) {
            this.database = await this.sqlite.create({ name: SQL_DB_NAME, location: 'default' })
        } else {
            this.database = window.openDatabase(SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
        }
        console.log('enter init')
        this.createTableWithSql();
        this.database_instance = await browserDBInstance(this.database);
        await this.createTable();
        await this.initData()
    }

    async createTables() {
        for (var i = 0; i < this.tables_data.length; i++) {
            let query = new Query(this.tables_data[i], []);
            await this.database_instance.executeSql(query);
        }
    }

    public create(tableName, item) {
        let sqlText;
        let values;
        switch (tableName) {
            case "BRAND_DATA":
                sqlText = "INSERT INTO BRAND_DATA (brandName, brandCode, brandDescription) VALUES (?,?,?) ";
                values = [item.brandName || null, item.brandCode || null, item.brandDescription || null]
                break;

            default:
                return;

        }
        let query = new Query(sqlText, values);
        let res = this.database_instance.executeSql(query);
    }


    public update(tableName, item) {
        let sqlText;
        let values;
        switch (tableName) {
            case "BRAND_DATA":
                sqlText = "UPDATE BRAND_DATA SET (brandName , brandCode , brandDescription ) = ( ? , ? , ? ) where brandCode = ? ;";
                values = [item.brandName || null, item.brandCode || null, item.brandDescription || null, item.brandCode]
                break;

            default:
                return;

        }
        let query = new Query(sqlText, values);
        let res = this.database_instance.executeSql(query);

    }


    public remove(tableName, item, type) {
        let sqlText;
        let values;   
        sqlText = `delete from ${tableName} where ${type} = ? `;
        values = [item.brandCode || null]
        let query = new Query(sqlText, values);
        console.log(query);
        
        let res = this.database_instance.executeSql(query);
    }

    async getSubBrandData() {
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM SUB_BRAND_DATA"))
        return data
    }
    async getSubBrandDataByCode(code) {
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM SUB_BRAND_DATA  WHERE brandCode=? ", [code]))
        return data
    }

    async getBrandData() {
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM BRAND_DATA"))
        return data
    }
    async getBrandDataByCode(code) {
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM BRAND_DATA  WHERE brandCode=? ", [code]))
        return data
    }

    public createTableWithSql() {
        this.tables_data = [
            // 'DROP TABLE UPLOAD_DATA',
            'CREATE TABLE IF NOT EXISTS BRAND_DATA(id INTEGER PRIMARY KEY AUTOINCREMENT,brandName VARCHAR(25),brandCode VARCHAR(25),brandDescription VARCHAR(225))',
            'CREATE TABLE IF NOT EXISTS SUB_BRAND_DATA(id INTEGER PRIMARY KEY AUTOINCREMENT,brandName VARCHAR(25),brandCode VARCHAR(25),subBrandCode VARCHAR(25),name VARCHAR(25),description VARCHAR(225),size VARCHAR(25))',
      
        ];
    }

    async initData() {
        let data = await this.database_instance.executeSql(new Query("SELECT * FROM BRAND_DATA"))
        if (data.length == 0) {
            this.http.get('assets/dummy_data.sql', { responseType: 'text' }).subscribe(sql => {
                if (this.platform.is('ios') || this.platform.is('android')) {
                    this.sqlitePorter.importSqlToDb(this.database, sql)
                        .then(async (data) => {
                        })
                        .catch(e => console.error(e));
                } else {
                    let data_list = sql.split(';');
                    for (var i = 0; i < data_list.length; i++) {
                        console.log(data_list);

                        this.database_instance.executeSql(new Query(data_list[i] + ''), []);
                    }

                }
            });
        }
    }

}




export class Query {
    private _queryString: string;
    private _parameter: (string | number)[];
    constructor(queryString: string, parameter?: (string | number)[]) {
        this._queryString = queryString;
        if (parameter instanceof Array) {
            this._parameter = parameter;
        } else if (parameter === undefined) {
            this._parameter = [];
        } else {
            this._parameter = [parameter]
        }
    }

    get queryString() {
        return this._queryString;
    }

    get parameter() {
        return this._parameter;
    }

    getStatement(): any {
        if (this._parameter !== null) {
            return [this._queryString, this._parameter]
        } else {
            return this._queryString;
        }
    }
}


export const browserDBInstance = (db) => {
    return {
        executeSql: (query: Query) => {
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(query.queryString, query.parameter, (tx, rs) => {
                        let resultSet = [];
                        for (let i = 0; i < rs.rows.length; i++) {
                            resultSet.push(rs.rows.item(i));
                        }
                        resolve(resultSet)
                        //resolve(rs)
                    });
                });
            })
        },
        sqlBatch: (arr) => {
            return new Promise((r, rr) => {
                let batch = [];
                db.transaction((tx) => {
                    for (let i = 0; i < arr.length; i++) {
                        batch.push(new Promise((resolve, reject) => {
                            tx.executeSql(arr[i], [], () => { resolve(true) })
                        }))
                        Promise.all(batch).then(() => r(true));
                    }
                });
            })
        }
    }

}

export class DatabaseError implements Error {
    public name = 'DatabaseError';
    constructor(public message: string, public error: any) { }
    toString() {
        return this.name + ': ' + this.message + '\n' + this.error;
    }


}





