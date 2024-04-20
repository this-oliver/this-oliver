import Mongoose from "mongoose";
import MIGRATION_05_23 from "./db-migrate-05-2023";
import MIGRATION_06_23 from "./db-migrate-06-2023";

/**
 * an action that alters the database
 */
interface IAction {
  description: string;
  action: () => Promise<void>;
}

/**
 * a set of actions that are executed together
 * during a migration
 */
interface IExecution {
  name: string;
  actions: IAction[];
}

/**
 * a description of a single action that has been
 * executed during a migration process and its status
 */
interface IMigration {
  name: string;
  description: string;
  status: 'pending' | 'completed';
}

/**
 * migration schema
 */
const MigrationSchema = new Mongoose.Schema<IMigration>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	status: { type: String, default: 'pending' }
}, { timestamps: true });

/**
 * migration model
 */
const MigrationModel = Mongoose.model<IMigration>("migration", MigrationSchema);

/**
 * List of migrations to be executed
 */
const executions: IExecution[] = [
	MIGRATION_05_23,
	MIGRATION_06_23
];

/**
 * Executes all migrations that have not been executed yet
 */
async function migrate() {
	let migrationCount = 0;

	// loop through all executions
	for (const execution of executions) {

		// Use .map to create an array of Promises
		const actionPromises = execution.actions.map(async action => {
			try {
				const migration = await MigrationModel.findOne({ name: execution.name, description: action.description });

				// if the migration has not been executed yet, create a new migration
				if (!migration) {
					const newMigration = await MigrationModel.create({
						name: execution.name,
						description: action.description
					});

					await action.action();
					await MigrationModel.updateOne({ _id: newMigration._id }, { status: 'completed' });

					migrationCount++;
					_log(`Migration ${execution.name} - ${action.description} executed successfully`);
				}

				// if the migration has not been executed yet, execute it
				else if (migration.status === 'pending') {
					await action.action();
					await MigrationModel.updateOne({ _id: migration._id }, { status: 'completed' });

					migrationCount++;
					_log(`Migration ${execution.name} - ${action.description} executed successfully (was pending)`);
				}

			} catch (error) {
				const errorMessage = (error as Error).message || error as string;

				_log(`Error executing migration ${execution.name} - ${action.description} \n^ Migration Error: ${errorMessage}\n`);
			}
		});

		// Use Promise.all to wait for all Promises to resolve
		await Promise.all(actionPromises);
	}

	// only log if migrations have been executed
	if (migrationCount > 0) {
		_log(`[${migrationCount}] migrations executed`);
	}
}

function _log(text: string) {
	console.info(`=> ${text}`);
}

export {
	IExecution,
	IMigration,
	MigrationModel,
};

export default migrate;