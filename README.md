# Frontend (Datenportal):
Urban mobility planning depends on reliable traffic data and intuitive analysis tools. DAVe (Database and Evaluation of Traffic Counts / Datenbank und Auswertung für Verkehrszählungen) is an open-source platform to manage, evaluate, and visualize traffic data. 
The software enables municipalities, transport planners, and mobility departments to analyze traffic flows, monitor long-term developments, and support data-driven infrastructure planning.

DAVe was started and opensourced by the Mobility Department of the City of Munich. This is Starwit's distribution, which is focused on easy operations.

This repository contains DAVe frontend which visualizes all captured data. Following screen shot shows an example.

![](/docs/img/dave-knotenstrom.png)

## About the project
This repository is one of the 5 components of the 'DAVe' application Not all five components necessarily have to be used at the same time. Following table shows DAVe's main components.

| Component        | Repository / URI                                           | Description                  |
| -----------------| -----------------------------------------------------------| -----------------------------|
| DAVe Backend     | https://github.com/starwit/dave-backend                    | Data Storage & Business Logic|
| DAVe Frontend    | https://github.com/starwit/dave-frontend                   | Analytics Frontend           |
| DAVe Admin Portal | https://github.com/starwit/dave-admin-portal              | Administration Frontend      |
| DAVe Self Service Portal | https://github.com/starwit/dave-selfservice-portal | Self-Service for data upload |
| DAVe Adapter     | https://github.com/starwit/dave-adapter                    | 

DAVe frontend is the application part responsible to present statistics, diagrams and reports. All captured data is presented on a map view on which users can drill down into each sensor location. 
It is a read only component that relies on DAVe Backend's data. 

The frontend (data portal) provides read-only access to the counts and enables extensive data analysis using various diagrams. The data portal offers read-only access to the counts, which can be searched for (including on a map). Once a user finds a count or measuring point, extensive data analysis can be performed there. Various diagrams are offered, which can also be downloaded as PDF reports if needed. New counts or changes cannot be made through this portal; the admin portal is available for that.


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated! This edition of DAVe is published under the AGPLv3 license. See section [license](#license) for more details. All contributions will also be published under this license.


## License
Everything in this repo is licensed under AGPL 3 and the license can be found [here](LICENSE).

## Contact
For Munich's edition it@m - opensource@muenchen.de

For Starwit's edition contact info@starwit.de
