import React from 'react';

class navbar extends React.Component {

    render(){
        return(
            <nav >
            <div className="navContent" id="appName" onClick={(e) => { this.props.active(e, 'home') }}>
                Notes
            </div>
            <div className="navContent" id="importantNav" onClick={(e) => {
                this.props.active(e, 'important')
                if (this.props.important.length === 0) {
                    fetch(`https://yournoteserver.herokuapp.com/savenote/important/`, {
                        method: 'GET',
                        headers: {
                            'content-type': 'text/plain',
                            'authorization': this.props.getCookie("token")
                        }
                    }).then((response) => {
                        if (response.status !== 200 && response.status != 304) {
                            return { err: "error" }
                        }
                        else {
                            return response.json()
                        }
                    }).then((importants) => {
                        this.props.importImportant(importants)
                    })
                }
            }}>
                Importants
            </div>
            <img src="/download.png" alt="logout" id="logoutButton" onClick={(e) => {
                document.cookie.split(";").forEach((c)=> { document.cookie = c.replace('Bearer','invalid');
                this.props.logout()
            })}} />
        </nav>
        )
    }

}
export default navbar;