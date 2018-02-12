# Shudi


[Based on](https://github.com/awslabs/aws-mobile-react-native-starter)

# Prerequisites

You must have home-brew installed

You must have SSH access to the Gunner Technology CodeCommit Repositories

You must have Xcode installed and updated to the latest

1. Create a new account in AWS organizations underneath the main Gunner Technology account
2. Create an IAM group in AWS with permissions to assume the role created in step #1
3. Add IAM users to the group who will be working on the project
4. Add a new IAM user to the new account with permissions to manage mobile hub (This is a workaround for awsmobile-cli not yet supporting roles)
5. Add the entry for that IAM user to ~/.aws/credentials
6. Add an entry for the Role to ~/.aws/credentials

# Install NVM
```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

# Install Node
```
$ nvm install 8
```

# Install yarn
```
$ brew install yarn --without-node
```

# Install watchman
```
$ brew install watchman
```

# install awsmobile-cli
```
$ yarn global add awsmobile-cli
```

# configure awsmobile-cli (using the IAM credentials from step 5 above as the inputs)
```
$ awsmobile configure
```


# install react native
```
$ yarn global add react-native-cli
$ yarn global add create-react-native-app
```

# clone the repo
```
$ git clone ssh://git-codecommit.us-west-2.amazonaws.com/v1/repos/shuldi
```

# configure the project
```
$ cd <path-to-project>/client
$ awsmobile pull
#  when prompted, choose “Y” - sync corresponding contents in backend/ with #current-backend-info/ => Yes
$ yarn install
```

# running the project
```
$ cd <path-to-project>/client
$ yarn run ios # or android
```

# deploying the project
```
$ cd <path-to-project>
$ yarn run build-api
$ awsmobile push
```