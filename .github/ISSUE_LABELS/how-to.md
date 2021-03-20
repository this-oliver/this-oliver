# how to use the github labels 

## what are the labels: 

>they are the labels that are found in the github repository.
***

## why is there a **label.json** file

>because i dont want to manually adjust and/or edit multiple lables at the same time via the github website. `github-labels` allows me to build all the labels i need via the **label.json** file and the `github-lables` command line tool.
***

## how does it work?

1. first things first, install [github-label-sync](https://registry.origami.ft.com/components/github-label-sync@2.0.0/readme) locally via `npm install -g github-label-sync`

2. adjust the **label.json** file to your liking

3. get a [github access token](https://github.com/settings/tokens) that you'll use to run the command line

4. run `github-label-sync --access-token xxxxxx --labels labels.json olivermanzi/olivermanzi`
