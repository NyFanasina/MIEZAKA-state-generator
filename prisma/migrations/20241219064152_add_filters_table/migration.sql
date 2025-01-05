BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Filters] (
    [id] INT NOT NULL IDENTITY(1,1),
    [filter_name] NVARCHAR(1000) NOT NULL,
    [filter_type] INT NOT NULL,
    [filter_category] NVARCHAR(1000),
    [filter_stock_weight] NVARCHAR(1000),
    [filter_marge] NVARCHAR(1000),
    [filter_etat] NVARCHAR(1000),
    [filter_supplier] NVARCHAR(1000),
    [user_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Filters_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Filters_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Filters_filter_name_key] UNIQUE NONCLUSTERED ([filter_name])
);

-- AddForeignKey
ALTER TABLE [dbo].[Filters] ADD CONSTRAINT [Filters_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
