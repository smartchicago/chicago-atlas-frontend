
# Bug reporting

These are steps and information to provide when reporting bugs and site errors that occur in production. Even if most of information is communicated verbally, make effort to write it down to preserve problem history.

1. **For one bug open one task** 
    - don't use single task to report on multiple bugs and don't repeat reports acorss different tasks (if bug is somehow related to other task, use Jira to mark it as such by using linked/blocked/related feature)
    - before opening new issue search backlog (and closed bugs) to see if similar bug is/was already reported

2. **Make tests and report results**
    - clear your browser cache (`CTRL+F5`) and test in incognito mode
    - does bug happen in all browsers?
    - does bug happen when you switch devices?
    - does bug happen on both cable and wireless network?
    - does bug happen with all input controls (mouse, touch, keyboard)?
    - does bug exist in all enviroments (dev, staging and production)?
    - check `console.log` for errors and include them in your report (same goes for any alerts and UI errors)

3. **Provide detailed description**
    - starting goal (what did you try to do)
    - clear and concise steps needed for reproduction
    - actual outcome (undesired behaviour)  
    - expected outcome (desired behaviour)

4. **Provide meta information**
    - one or more URLs at which bug happens
    - screenshot or better yet, short video (you can use [Licecap](http://www.cockos.com/licecap/))
    - OS, device, resolution and browser information (you can get it from [here](http://mybrowserinfo.com/detail.asp))

5. **Mark priority** 
    - set priority in dedicated task manager (Asana or Github issues or Basecamp) to high if it's critical bug or medium/low otherwise so work can be scheduled properly


**References:**
- <https://developer.apple.com/bug-reporting/>
- <https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines>
