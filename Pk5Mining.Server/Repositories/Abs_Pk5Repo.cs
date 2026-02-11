using System.Diagnostics;

namespace Pk5Mining.Server.Repositories
{
    public abstract class Abs_Pk5Repo<T1, T2> where T1 : class
    {
        protected readonly Pk5MiningDBContext DbContext;

        protected Abs_Pk5Repo(Pk5MiningDBContext dbContext)
        {
            DbContext = dbContext;
        }

        public abstract Task<(T1?, string?)> GetRepoItem(long Id);
        public abstract Task<IEnumerable<T1>> GetRepoItems();
        public abstract Task<(T1?, string?, bool)> PostRepoItem(T2 item);
        public abstract Task<(T1?, string?, bool)> UpdateRepoItem(T1 obj);
        public abstract Task<(T1?, string?)> DeleteRepoItem(long Id);


        protected async Task<(T1?, string?)> GetRepoItemAsync(long Id)
        {
            try
            {
                var entity = await DbContext.FindAsync<T1>(Id);
                Debug.WriteLine(entity);

                return (entity, null);
            }
            catch (Exception ex)
            {
                //log the exception details
                Console.WriteLine(ex.ToString());
                return (null, ex.Message);
            }
        }

        protected async Task<(T1?, string?)> PostRepoItemAsync(T1 obj)
        {
            try
            {
                var entity = (await DbContext.AddAsync(obj)).Entity;
                await DbContext.SaveChangesAsync();

                return (entity, null);
            }
            catch (Exception ex)
            {
                //log the exception details
                Console.WriteLine(ex.ToString());
                return (null, ex.Message);
            }
        }

        protected async Task<(T1?, string?)> UpdateRepoItemAsync(T1 obj)
        {
            try
            {
                var entity = DbContext.Update(obj).Entity;
                await DbContext.SaveChangesAsync();

                return (entity, null);
            }
            catch (Exception ex)
            {
                //log the exception details
                return (null, ex.Message);
            }
        }
    }
}