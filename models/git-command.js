class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){
        let num_of_changes = Object.keys(this.working_directory.new_changes).length;
        let message = `You have ${num_of_changes} change/s.\n`;
        if(num_of_changes > 0){
            let counter = 0;
            for(var file in this.working_directory.files){
                counter++;
                if(counter < num_of_changes)
                    message += `${file}\n`;
                else
                    message += `${file}`;
            }
        }
        return message;
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
        else if(path_file == "."){
            this.staging.push(modified_files);
            this.working_directory.new_changes = {};
        }
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;