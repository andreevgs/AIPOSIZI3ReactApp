import axios from "axios";

class AuthService {
    login(username, password) {
        return axios
        .post('http://127.0.0.1:5000/api/auth/signin', {
            username,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, email, password) {
        return axios.post('http://127.0.0.1:5000/api/auth/signup', {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    handleGoogleLogin(googleData) {
        console.log('googleData: ', googleData);
        axios.post('http://127.0.0.1:5000/api/auth/google', googleData)
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                window.location.reload();
            })
            .catch(err => {
                console.log('error log in via google');
            });
    }

    handleFacebookLogin(facebookData) {
        console.log('facebookData: ', facebookData);
        axios.post('http://127.0.0.1:5000/api/auth/facebook', facebookData)
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                window.location.reload();
            })
            .catch(err => {
                console.log('error log in via facebook');
            });
    }

    handleGitHubLogin(githubData) {
        console.log('githubData: ', githubData);
        axios.post('http://127.0.0.1:5000/api/auth/github', githubData)
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                window.location.reload();
            })
            .catch(err => {
                console.log('error log in via github');
            });
    }

}

export default new AuthService();