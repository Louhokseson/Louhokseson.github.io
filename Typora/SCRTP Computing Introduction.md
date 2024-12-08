# Introduction to Warwick SCRTP System

**Disclaimer:**

The information provided in this guide is intended to assist users in utilizing the SCRTP effectively. However, Hokseon  does not assume any responsibility for errors, omissions, or for any consequences resulting from the use of the information contained herein. Users are advised to exercise caution and follow all provided guidelines and university policies when using the HPC unit and SCRTP system. Any misuse or unauthorized actions that result in damage to the HPC unit or impact its performance are the sole responsibility of the user. By using the HPC unit, you agree to hold Hokseon and the university harmless from any and all liability.

This note includes information and excerpts from official documentation [Warwick SCRTP docs](https://docs.scrtp.warwick.ac.uk/index.html) . All credit for such content belongs to the original authors and sources. This note is provided "as is" without any guarantees or warranty. Users are encouraged to consult the original documentation for comprehensive details.

​																						Hokseon Lou

​																						  $6^{\text{th}}$ Aug 2024

### Before Reading It

Make sure you already had the access to the SCRTP machine. A simply test is 

1. Open your terminal on your local/own machine. Tpye this command

   ```bash
   ssh your_6_ditgit_username@godzilla.csc.warwick.ac.uk
   ```

   replace the `your_6_ditgit_username` with your username given by SCRTP (probably from the email they send to you). Then press `Enter` on your physical keyboard.

2. Input your password. Then press `Enter` from your physical keyboard.

3. You should see something similar to this on your terminal

   ```bash
   # DO NOT RUN COMPUTATIONALLY INTENSIVE JOBS ON THIS MACHINE
   # including, but not limited to:
   # - comsol
   # - dropbox
   # - gromacs (gmx)
   # FAILURE TO COMPLY MAY RESULT IN ACCOUNT SUSPENSION
   Last login: Wed Aug  7 18:50:29 2024 from 192.41.114.230
   Thu  8 Aug 11:58:25 BST 2024
   your_6_ditgit_username@godzilla:~$ 
   ```

If you went through the steps I list above with ease, you can keep reading if you want to. If not, ask a senior member in the group (i.e. Postdocs) for instructions. I am sure they would just let you go through the group induction webpage tho.

I am not a native English speaker. **If you found anything doesn't make sense to you in grammar and you can't stand with it, feel free to let me know. I will appreciate your corrections but probably don't have time to update this note 哈哈😄. **

## Introduction: Taskfarm VS HPC cluster

**Taskfarm**: It is a system which allows users of [SCRTP Linux](https://docs.scrtp.warwick.ac.uk/linux.html#scrtplinux) to submit job scripts to a [batch processing](https://docs.scrtp.warwick.ac.uk/general-pages/batchq.html#general-batchq) queue. Jobs submitted in this way will be scheduled and executed on server hardware running [SCRTP Linux](https://docs.scrtp.warwick.ac.uk/linux.html#scrtplinux).

The batch system in use on the taskfarm is known as [SLURM](https://slurm.schedmd.com/documentation.html). Using SLURM, jobs can be submitted to the taskfarm from any workstation or server (e.g. `godzilla`) running [SCRTP Linux](https://docs.scrtp.warwick.ac.uk/linux.html#scrtplinux).

**HPC clusters**: The SCRTP operates two High Performance Computing (HPC) clusters available to all users at Warwick. These are currently the older and larger `Avon` cluster which has been in service since 2021. **So it's faster and better than Taskfarm when it comes to computational intense work.** It uses the [batch processing](https://docs.scrtp.warwick.ac.uk/general-pages/batchq.html#general-batchq) system also on [SCRTP Linux](https://docs.scrtp.warwick.ac.uk/linux.html#scrtplinux)  which manages their workload. 

**Difference**: HPC needs an extra [registration](https://warwick.ac.uk/research/rtp/sc/hpc/register/) (follow the steps from the link). Ask Reini or other seinor members if you're unsure about this application. (I am sure they would just ask you to read that webpage again. At least, that was what I be told to do.)

## How to Upload Your Scripts/Repositories onto SCRTP units

In this section, I assume you already have the access to one of this SCRTP machine. i.e. you should have some like

```bash
[mssgwp@login01(avon) ~]$ 
# This is just for illustration (Reini's username on SCRTP)
# You should have your own 6-digit username
```

Personally, I upload or download the my scripts and data through git cloning. It can be the easiest way to do so. Then, first step is to configure your github account on your ssh machine i.e. on `godzilla` or `Avon`. There are mainly two ways. I will present one way step by step for you to let get everything going instantly.

### Configuring GitHub Authentication with SSH

Add your git username and email remotely. Simply via

```bash
git config --global user.name "your_username_from_GitHub"

git config --global user.email "your_Github_account_conjugate_email"
```

This configuration should align your github account, because your git actions on this remote machine will be recorded by this configuration. For example,  it should show your git actions nicely from Gitlen history.

1. Generate an SSH key on your remote machine

   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com"
   ```

   When prompted to "Enter a file in which to save the key," press **Enter** to accept the default location. When prompted for a passphrase, **you can optionally enter one or just press Enter for no passphrase**. I perfer no passphrase. Because otherwise you need to enter it everytime you clone a repo.

2. Start the SSH agent on your remote machine and add the key:

   ```bash
   eval "$(ssh-agent -s)"
   ```

   Add your SSH private key to the SSH agent:
   ```bash
   ssh-add ~/.ssh/id_ed25519
   ```

3. Add Your SSH key to your Github account:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

   It should generate the SSH key on your (remote) terminal. Copy this random code from your terminal. Then, log in to your GitHub account on your browser, go to **Settings** > **SSH and GPG keys** > **New SSH key**, and paste the key there with a descriptional name there. i.e. your machine name "Avon".

4. Test SSH connection:

   On your remote machine terminal, run 

   ```bash
   ssh -T git@github.com
   ```

   If you see a message like
   ```bash
   Hi username! You've successfully authenticated, but GitHub does not provide shell access.
   ```

   Your account is all set with SSH key from the remote machine!

5. Last step: Clone repo you want

   ```bash
   git clone git@github.com:username/repository.git
   ```

   In your github repo browser page, **click green botton "Code"  > click SSH > copy and link it shows**.

### Another Authentication Method: Personal Access Token

This is another way linking your GitHub account to the remote machine. Instead of cloning repo via 

```bash
git clone git@github.com:username/repository.git
```

You will do

```bash
git clone https://github.com/username/repository.git
```

Ask ChatGPT for the further details about the setup (Should be easy!).

## How to Submit a Batch Process? / How to Let Remote Units Run Your Scripts?

**Before the submission, you need to make sure**

- Workloads (your scripts) submitted to these systems must be *non-interactive*. They must not depend on user input to continue or require display of any graphical user interface (GUI) i.e. using your mouse or keyword to pause or resume your script.
- The images can not be displayed by batch process. But what you can do is to save it. Personally, I perfer generating graphs on my local computer or using ssh on a specific remote unit by VScode. It just makes everything easier.

### Templates of  [SLURM](https://slurm.schedmd.com/documentation.html)

**Taskfarm**

Create a `.sh` or `.slurm` file by `vim` or `nano` on godzilla (ssh-ed). This is going to be the script instructing the remote computing unit to assign how much running time/ computational power / CPU or GPU or output logs of your jobs.

```sh
#!/bin/bash
#SBATCH --time=48:00:00
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=48
#SBATCH --mem-per-cpu=3800
#SBATCH --cpus-per-task=1
#SBATCH --output=output_%j.log # Standard output and error log
#SBATCH --error=error_%j.log   # Error log

# Load the Julia module
module Julia/1.10.4-linux-x86_64

# Ensure DrWatson package is installed


# Run your Julia script
julia run_MDEF.jl

# End of script
```

Here, I am assigning a task that uses specific module/language kernel (i.e. you might use a certain Python kernel) - `Julia/1.10.4-linux-x86_64` which is **stored on the my own SCRTP allocation** to run my script `run_MDEF.jl`. 

The `#SBATCH --` and `#!/bin/bash` on the top are pretty much fixed. It should follow the maximum capability of your selected partition/computing unit node.

To check your desire partition's capabilities, you could try this command:

```bash
$ sinfo
```

This should give you all information about the partition on that SCRTP hardware you logged in. For example, the `compchem` partition has

```bash
$ sinfo -p compchem
PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST
compchem     up 2-00:00:00      1    mix rem124
compchem     up 2-00:00:00      1  alloc rem123
```

Node `rem124` and `rem123`. Then, the amount of computation power you ask for in your SLURM file (.sh) should under the capability of the nodes provided in your partition. The command to check the capability of the nodes is

```bash
$ scontrol show node rem124
NodeName=rem124 Arch=x86_64 CoresPerSocket=22 
   CPUAlloc=16 CPUEfctv=44 CPUTot=44 CPULoad=16.00
   AvailableFeatures=(null)
   ActiveFeatures=(null)
   Gres=(null)
   NodeAddr=rem124.csc.warwick.ac.uk NodeHostName=rem124.csc.warwick.ac.uk Version=23.02.0
   OS=Linux 5.14.0-427.28.1.el9_4.x86_64 #1 SMP PREEMPT_DYNAMIC Wed Jul 31 15:28:35 UTC 2024 
   RealMemory=191343 AllocMem=64000 FreeMem=151882 Sockets=2 Boards=1
   State=MIXED ThreadsPerCore=1 TmpDisk=0 Weight=1 Owner=N/A MCS_label=N/A
   Partitions=compchem 
   BootTime=2024-08-05T17:38:58 SlurmdStartTime=2024-08-05T17:39:37
   LastBusyTime=2024-08-05T10:44:45 ResumeAfterTime=None
   CfgTRES=cpu=44,mem=191343M,billing=44
   AllocTRES=cpu=16,mem=62.50G
   CapWatts=n/a
   CurrentWatts=0 AveWatts=0
   ExtSensorsJoules=n/s ExtSensorsWatts=0 ExtSensorsTemp=n/s
```



## Some Commands You Need to Know in Shell Script(Bash)

### Job Status

```bash
$ squeue
```

is the command you have to memorized for checking the queue on godzilla or Avon. It lists all the current running or pending jobs submitted to the specific computing unit.

 The command in `Bash` to check your own submitted jobs is

```bash
$ squeue -u $USER
```

I don't want to store this stupid command in my brain and type it 10 times a day. I recommand you to set up a hotkey to make your life easier! Just simply do the following steps

```bash
$ vim ~/.bashrc
```

and input the statement below in your `.bashrc` file

```bashrc
alias qq='squeue -u $USER'
```

Find your `Esc` on your keyboard and press it. Then type `:wq` to save the change you just made in that file. 

The last step is to source the `.bashrc` file. In your terminal, run 

```bash
$ source ~/.bashrc
```

If everything is done correctly, you will see 

```bash
$ qq
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
           3471968   compute run_MDEF   username R      21:00      1 taskfarm188
```

as a example. Of course, you could replace `qq` in the alias statement to whatever you want for the hotkey. This hotkey trick was advised by Dr. Connor Box.

**Monitoring Your Jobs Status in Real-time **

You can do it by

```bash
$ watch -n 1 squeue -u msrhzr
```

**To exit `watch`, press `control` + `c` on your keyboard.** Personally, I set the hotkey of monitoring as `wqq`.

**Check the Completed Job Information**

If you wanted to check the state/starting time/finish time and the period of your job, you could try

```bash
$ sacct -j your_job_ID --format=JobID,JobName,Partition,State,Start,End,Elapsed
```

A hotkey can be done by adding a function in `~/.bashrc` file.

```vim
cj() { sacct -j "$1" --format=JobID,JobName,Partition,State,Start,End,Elapsed; }
```

With this function, you now are able to check the job's information by

```bash
$ cj your_job_ID
```

i.e.

```bash
$ cj 3471968
JobID           JobName  Partition      State               Start                 End    Elapsed 
------------ ---------- ---------- ---------- ------------------- ------------------- ---------- 
3471968      run_MDEF.+    compute  COMPLETED 2024-08-07T15:16:02 2024-08-07T15:38:49   00:22:47 
3471968.bat+      batch             COMPLETED 2024-08-07T15:16:02 2024-08-07T15:38:49   00:22:47 
3471968.ext+     extern             COMPLETED 2024-08-07T15:16:02 2024-08-07T15:38:49   00:22:47 
```

**A Magic Command From Benedict Saunders **

Ben posted a command on Slack which could get the estimated queuing time of your submitted jobs. But Joe Gilkes said this isn't always reliable based on the fact that you are in Chemistry.... So, if you still want to let your terminal print something, you could try this magic command:

```bash
$ squeue -u $USER -o "%.10i %.9P %.12q %.14j %.10u %.12a %.8T %.12l %.10M %.20V %.20S %.20e %.6D %.5C %.14b %.8m %R"
```





# Making Most of Your Allocated Computing Power

This is a update on 3 Oct 2024 by Hokseon since Hokseon is running some 'heavy lifting' dynamics.

## Taskfarm

We computational chemists can use PARTITION
```bash
compchem
compute
```

`compchem` stands for computational chemistry so obviously we are able to use it. `compute` is just general computing partition so it is shared with anyone owns a SCRTP account.

Hokseon suggestion: **Submit you work on the `compute` partition first! If it takes you a long time to queue, you switch back to `compchem`.** Haha zero sum game!

### What does partition mean here?
For HPC, Partition is to group these computing nodes together. i.e. 2 Nivida(xxxx) nodes consist of one partition named as `Hello`. It just makes those HPC people easiler to assign those computing power to users. i.e. we are allocated to `compchem`.  

### Write and Optimise Your Request

**Job Name** Don't ignore it! You can name your job with couples of characters to distinguish each of them. (Actually very important when you are running many stuff at the same time) method+coefficient

```sh
#SBATCH --job-name="SH0.49"
```

**Time** always ask for 2 days

```sh
#SBATCH --time=48:00:00             # Set maximum job run time to 48 hours
```

**Partition**

```sh
#SBATCH --partition=compchem        # Request the compchem partition
```

**Number of nodes** depends on the how many nodes are there in your chosen partition and also the availability when you submit your job

``` sh
#SBATCH --nodes=2                   # Request two nodes
```


# Some Tricks You Might Need
### User History of Your Machine
If you're bored or just wanted to check is there anyone currently sharing the machine with you, you could do the followings:

1. who command

```
who
```
`who` command displays a list of all users currently logged in to the system, along with the terminal they are using and their login times.

2.  `w` command
It provides a more detailed overview of logged-in users, including what they are doing.

3. `last` command
```
last -n 10
```
It displays a history of logins, including current and past sessions. Add `-n` to limit the output.

**Nutshell**
I prefer using `last` command tho.


# Accessing Jupyter Notebooks
This section is for those people who want to use Jupyter notebooks within or out of Warwick Network. This section is mainly a copy&paste from a [tutorial](https://warwick.ac.uk/fac/sci/physics/staff/academic/nicholashine/notebooks_2024/) from [Prof.Nick Hine](https://warwick.ac.uk/fac/sci/physics/staff/academic/nicholashine/). Errors are from me. All the credits go to him!

By just in case of his website disappears, I just record it in this note.

### Install the Jupyter Notebook for Your SCRTP Account
For the first usage, you need to do these steps below. If you have done them before, just skip this subsection.
1. ssh log into one of the SCRTP machine
i.e.
```
ssh yourusername@stan1.scrtp.warwick.ac.uk
```
2.  install the Jupyter Notebook by doing this line
```
/storage/physics/apxpcw/QAM/install_jupyter
```
It should automatically start downloading the jupyter notebook on your account.
3. When prompted, choose a password for your Jupyter Notebook - this can be the same as your SCRTP password. **I just suggest you set it as your SCRTP password.** 
4. Ask for help if you get any error messages in red. An exception is any that begin "ERROR: pip's dependency resolver does not currently take into account all the packages that are installed" which is (as far as I know) harmless.
5. Source the `.bashrc` file 
```
source .bashrc
```
That's it for our first step.


### Enabling a Direct Connection
To enable a secure, https-based connection to your jupyter notebook server (so that it is safe to enter your password to connect to other machines), we create and add a ssl key and add it to your jupyter notebook configuration. I have created the following script which does this (read through it first if you are interested):
```
/storage/physics/apxpcw/QAM/add_key_to_jupyter_config
```

You will be prompted for information about yourself for the private key you will use. You should put some basic details in here so the key is distinguishable from others, but there is no need to fill it all in accurately as no one else sees this data.

Please note this is a "self-signed" key, not lodged with any certificate authority, so it will not be recognised by your browser as sufficient for what it thinks is a secure connection. You will have to tell the browser to connect anyway: the exact way to do this differs between different browsers but it is usually under "Advanced" or similar on the warning page (yellow borders in firefox).

### Launching a Notebook Server

####  **If you are from non-warwick internet**
```
jupyter notebook --no-browser --port=8888
```
 You should see some message coming out from jupyter kernel
 ```
 [I 16:04:33.448 NotebookApp] Jupyter Notebook 6.4.0 is running at:

[I 16:04:33.448 NotebookApp] https://stan1.csc.warwick.ac.uk:8888/

[I 16:04:33.448 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
```
It means it's lauched successfully.

From outside the Warwick network, the range of ports on which we run these notebooks is blocked for external access by the university firewall. Therefore we need to establish an "ssh tunnel" via an allowed, secure method, ie ssh. The purpose of this tunnel is to map a TCP/IP port on your local machine to a port on a remote machine. For simplicity we will use the same port number on both machines.

First, open a new terminal on your local machine, and type in this below. Here, we are logging in machine `stan1`, you have to change it for the machine you want to tunnel to.
```
  ssh -N -f -L localhost:8888:localhost:8888 yourname@stan1.csc.warwick.ac.uk
```
input your scrtp password then open your browser on 
[https://localhost:8888](https://localhost:8888/)
You should see jupyter notebook password login page. then just input your setup password and start using your remote machine via jupyter notebook!!

The main idea here is linking your local machine from non-warwick network onto a machine you want to use jupyter notebook via ssh. Using this local hosting port, you are actually commanding the remote machine i.e. `stan1` to open your jupyter browser page.

#### **Using Jupyter noetbook from Warwick network**
1. Just input 
```
jupyter notebook
```
in your terminal.  It would output some message like

```
[I 16:26:07.268 NotebookApp] Jupyter Notebook 6.4.0 is running at:

[I 16:26:07.268 NotebookApp] https://jollie.csc.warwick.ac.uk:8888/

[I 16:26:07.268 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
```
2. Copy the website address on your output message, go to your browser and paste it and direct you to the jupyter browser interface.
3. Input your jupyter password, then start your jupyter session.
### Closing the jupyter Notebook
#### You are out of Warwick Network
**To log out your jupyter notebook:**
1. There is a log out botton on **top right on the browser**, press it if you redirect to [https://localhost:8888](https://localhost:8888/), you need to input the passwords. 

 2. If you **pressed the quit bottom** beside log out botton, it would kill your jupyter kernel. You have to launch it again if you want to use it.



**If you have killed the kernel recently and you wanted to open a new one it shortly** 

1. check your previous sshed port on your local machine terminal

```
isof -i:8888
```
and kill the process by the listed PID
```
kill <PID>
```
We're just making sure that the previous tunnel port is killed on our local machine.

2. Re-launch the jupyter notebook by following the steps I listed above.

#### You are in Warwick Network
Same with the subsection **You are out of Warwick Network**, you don't need to worry about the ssh tunnelling because you're already in the warwick network.