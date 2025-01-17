import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class SituationSociale implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _context: ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;

    constructor() {}

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._context = context;
        this._container = container;
        this._notifyOutputChanged = notifyOutputChanged;

        // Create main container
        const mainDiv = document.createElement("div");
        mainDiv.className = "situationSociale";

        // Create header
        const header = document.createElement("div");
        header.className = "header";
        
        const heading = document.createElement("h2");
        heading.innerText = "Situation Sociale";
        header.appendChild(heading);
        
        mainDiv.appendChild(header);

        // Create grid
        const grid = document.createElement("div");
        grid.className = "grid";

        // Updated headers array
        const headers = [
            "Type d'aide",
            "Situation",
            "Actions",
            "Date début",
            "Dernière modification",
            "Date fin",
            "Statut",
            "Situation de fin"
        ];

        headers.forEach(headerText => {
            const headerCell = document.createElement("div");
            headerCell.className = "grid-header";
            headerCell.innerText = headerText;
            grid.appendChild(headerCell);
        });

        // Load and display data
        this.loadSocialAidStatus(grid);

        mainDiv.appendChild(grid);
        this._container.appendChild(mainDiv);
    }

    private async loadSocialAidStatus(grid: HTMLDivElement): Promise<void> {
        try {
            const dataset = this._context.parameters.socialAidStatusSet;
            
            if (dataset.loading) {
                const loadingDiv = document.createElement("div");
                loadingDiv.className = "grid-cell";
                loadingDiv.innerText = "Loading...";
                grid.appendChild(loadingDiv);
                return;
            }

            dataset.sortedRecordIds.forEach(recordId => {
                const record = dataset.records[recordId];
                const row = this.createGridRow(record);
                grid.appendChild(row);
            });

        } catch (error) {
            const errorDiv = document.createElement("div");
            errorDiv.className = "grid-cell error";
            errorDiv.innerText = "Error loading data: " + (error as Error).message;
            grid.appendChild(errorDiv);
        }
    }

    private createGridRow(record: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord): DocumentFragment {
        const fragment = document.createDocumentFragment();
        
        // Get values from record with proper formatting
        const aidType = record.getFormattedValue("cr399_aidtype") || "-";
        const status = record.getFormattedValue("cr399_status") || "-";
        const actions = record.getFormattedValue("cr399_actions") || "-";  // Add this line
        const startDate = this.formatDate(record.getFormattedValue("cr399_datedebut"));
        const lastModified = this.formatDate(record.getFormattedValue("cr399_datederniere"));
        const endDate = this.formatDate(record.getFormattedValue("cr399_datefin"));
        const situationFin = record.getFormattedValue("cr399_situationfin") || "-";
    
        const cells = [
            aidType,
            status,
            actions,  // Updated this line
            startDate,
            lastModified,
            endDate,
            status,
            situationFin
        ];
    
        cells.forEach(cellText => {
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.innerText = cellText;
            fragment.appendChild(cell);
        });
    
        return fragment;
    }

    private formatDate(dateString: string | null): string {
        if (!dateString || dateString === "-") return "-";
        
        try {
            // Log the input for debugging
            console.log('Input date string:', dateString);
            
            // If it's already formatted (contains forward slashes), return as is
            if (dateString.includes("/")) {
                return dateString;
            }
    
            // Handle ISO date string
            if (typeof dateString === 'string' && dateString.includes("T")) {
                const date = new Date(dateString);
                if (!isNaN(date.getTime())) {
                    return new Intl.DateTimeFormat('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }).format(date);
                }
            }
    
            // If we can't format it, return the original string or dash
            return dateString || "-";
        } catch (error) {
            console.error('Error formatting date:', error);
            return "-";
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Refresh the view when data changes
        this._container.innerHTML = "";
        this.init(context, this._notifyOutputChanged, {}, this._container);
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Clean up
    }
}