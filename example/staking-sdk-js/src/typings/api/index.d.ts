export interface SymbolDto {
    address: string;
    symbol: string;
}
export interface GetTransactionListRequestDto {
    /**
     * Item offset paging parameter
     */
    offset?: number;
    /**
     * Item count paging parameter
     */
    count?: number;
    /**
     * Transaction id
     */
    txId?: string;
    /**
     * Account name for filtering transactions
     */
    account?: string;
    /**
     * Start transactions time in millis
     */
    dateFrom?: number;
    /**
     * End transactions time in millis
     */
    dateTo?: number;
    /**
     * (Only for transfers) Optional parameter for token transfers ("incoming",
     * "outgoing"), if account param exists
     */
    direction?: 'incoming' | 'outgoing';
    /**
     * First block for filtering transactions
     */
    blockFrom?: string;
    /**
     * Last block for filtering transactions
     */
    blockTo?: string;
    /**
     * (Only for transfers) Optional array of symbol objects
     */
    symbols?: Array<SymbolDto>;
    /**
     * Optional array of actions
     */
    actions?: Array<string>;
}
/**
 * Model of parameters for API `/transaction`
 */
export interface TransactionParameters {
    GetTransactionListRequestDto: GetTransactionListRequestDto;
}
export declare type TransactionResponse<TCode extends 200 | 400 = 200 | 400, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : any;
export declare type BlockResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export interface PutFormTokenBodyDto {
    /**
     * account name (email address)
     */
    username: string;
    /**
     * password
     */
    password: string;
}
/**
 * Model of parameters for API `/admin/token`
 */
export interface AdmintokenParameters {
    PutFormTokenBodyDto: PutFormTokenBodyDto;
}
export declare type AdmintokenResponse<TCode extends 200 | 400 | 401 | 403 | 404 = 200 | 400 | 401 | 403 | 404, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : TCode extends 403 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : any;
export declare type AdminmigrationRequestStatusResponse<TCode extends 200 | 400 | 401 = 200 | 400 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export interface MigrationStatusBodyDto {
    /**
     * User migration status: 1 - request verified, 2 - accepted, 3 - rejected
     */
    status: any;
}
/**
 * Model of parameters for API `/admin/migration-request/{requestId}`
 */
export interface AdminmigrationRequestRequestIdParameters {
    MigrationStatusBodyDto: MigrationStatusBodyDto;
}
export declare type AdminmigrationRequestRequestIdResponse<TCode extends 200 | 401 | 403 | 404 | 409 = 200 | 401 | 403 | 404 | 409, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : TCode extends 403 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : TCode extends 409 ? TContentType extends '$ref' ? null : any : any;
export declare type AdminenvironmentResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends 'type' | 'items' | '$ref' = 'type' | 'items' | '$ref'> = TCode extends 200 ? TContentType extends 'type' ? null : TContentType extends 'items' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type AdminreportCampaignIdResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends 'application/json' | '$ref' = 'application/json' | '$ref'> = TCode extends 200 ? TContentType extends 'application/json' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type AdminmigrationReportStatusResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends 'application/json' | '$ref' = 'application/json' | '$ref'> = TCode extends 200 ? TContentType extends 'application/json' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type AdminaccountBalancereportResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends 'application/json' | '$ref' = 'application/json' | '$ref'> = TCode extends 200 ? TContentType extends 'application/json' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type AdminadminResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends 'type' | 'items' | '$ref' = 'type' | 'items' | '$ref'> = TCode extends 200 ? TContentType extends 'type' ? null : TContentType extends 'items' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export interface UpdateAdminParamsDto {
    /**
     * Disable or enable admin
     */
    enabled?: boolean;
    /**
     * New admin password (8 symbols with one upper, lower and digit)
     */
    password?: string;
}
/**
 * Model of parameters for API `/admin/admin/{id}`
 */
export interface AdminadminIdParameters {
    UpdateAdminParamsDto: UpdateAdminParamsDto;
}
export declare type AdminadminIdResponse<TCode extends 200 | 400 | 401 | 404 = 200 | 400 | 401 | 404, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : any;
export declare type AccountBalancetopResponse<TCode extends 200 | 400 = 200 | 400, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : any;
export declare type AccountBalanceCronupdateResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type TokenResponse<TCode extends 200 | 400 = 200 | 400, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : any;
export declare type EnvironmentResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export interface PostUserDeviceRequestDto {
    /**
     * FCM Token
     */
    fcmToken: string;
    /**
     * Device type iOS = 0 or ANDROID = 1
     */
    deviceType: number;
    /**
     * ISO 639-1 language code
     */
    locale: string;
}
/**
 * Model of parameters for API `/user/device`
 */
export interface UserdeviceParameters {
    PostUserDeviceRequestDto: PostUserDeviceRequestDto;
}
export declare type UserdeviceResponse<TCode extends 200 | 400 = 200 | 400, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : any;
export declare type UserdeviceDeviceIdResponse<TCode extends 200 | 400 | 401 | 404 = 200 | 400 | 401 | 404, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : any;
export interface ConfirmUserParamsDto {
    /**
     * User email
     */
    email: string;
    /**
     * Confirmation code
     */
    code: string;
}
/**
 * Model of parameters for API `/user/data`
 */
export interface UserdataParameters {
    ConfirmUserParamsDto: ConfirmUserParamsDto;
}
export declare type UserdataResponse<TCode extends 200 | 400 | 403 | 404 = 200 | 400 | 403 | 404, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 403 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : any;
export declare type MigrationCronaddresscheckResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export declare type MigrationCrontrxcheckResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export declare type MigrationCrontrxsendResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export declare type AccountCronupdateResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export interface PostMigrationRequestDto {
    /**
     * Either account name or public key for the new account to receive tokens from the
     * last generation blockchain
     */
    addressTo: string;
}
/**
 * Model of parameters for API `/migration`
 */
export interface MigrationParameters {
    PostMigrationRequestDto: PostMigrationRequestDto;
}
export declare type MigrationResponse<TCode extends 200 | 400 | 401 = 200 | 400 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type MigrationAddressToResponse<TCode extends 200 | 400 | 401 | 404 = 200 | 400 | 401 | 404, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : any;
export interface PostMigrationRequestBodyDto {
    /**
     * 0 - MC Wallet, 1 - Alladin
     */
    origin: number;
    /**
     * user email (from old wallet account)
     */
    email: string;
    /**
     * account name or public key for the ABBC Gen.2 blockchain
     */
    account: string;
}
/**
 * Model of parameters for API `/migration-request`
 */
export interface MigrationRequestParameters {
    PostMigrationRequestBodyDto: PostMigrationRequestBodyDto;
}
export declare type MigrationRequestResponse<TCode extends 201 | 400 | 404 | 409 = 201 | 400 | 404 | 409, TContentType extends '$ref' = '$ref'> = TCode extends 201 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : TCode extends 409 ? TContentType extends '$ref' ? null : any : any;
export interface PutMigrationRequestBodyAnonimusDto {
    /**
     * request verification code
     */
    verificationCode: string;
}
/**
 * Model of parameters for API `/migration-request/{requestId}`
 */
export interface MigrationRequestRequestIdParameters {
    PutMigrationRequestBodyAnonimusDto: PutMigrationRequestBodyAnonimusDto;
}
export declare type MigrationRequestRequestIdResponse<TCode extends 200 | 400 | 403 | 404 | 409 = 200 | 400 | 403 | 404 | 409, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 403 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : TCode extends 409 ? TContentType extends '$ref' ? null : any : any;
export interface MigrationPhoneVerificationParamsDto {
    /**
     * 6 digits verification code from sms
     */
    verificationCode: string;
}
/**
 * Model of parameters for API `/migration-request-phone/{requestId}`
 */
export interface MigrationRequestPhoneRequestIdParameters {
    MigrationPhoneVerificationParamsDto: MigrationPhoneVerificationParamsDto;
}
export declare type MigrationRequestPhoneRequestIdResponse<TCode extends 200 | 400 | 403 | 404 = 200 | 400 | 403 | 404, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 403 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : any;
export interface PostTransactionRequestDto {
    /**
     * List of transaction ids
     */
    trxs: Array<string>;
}
/**
 * Model of parameters for API `/migration-admin/trx/send`
 */
export interface MigrationAdmintrxsendParameters {
    PostTransactionRequestDto: PostTransactionRequestDto;
}
export declare type MigrationAdmintrxsendResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export declare type SymbolInfoerc20Response<TCode extends 200 | 400 | 401 = 200 | 400 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type SymbolInfoerc20ContractAddressResponse<TCode extends 200 | 401 | 404 | '400: Invalid contract address' = 200 | 401 | 404 | '400: Invalid contract address', TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : TCode extends '400: Invalid contract address' ? TContentType extends '$ref' ? null : any : any;
export declare type SymbolInfoResponse<TCode extends 200 | 400 | 401 = 200 | 400 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export interface BodyTransactionInfoPredifinedDto {
    /**
     * Address which is tied up to user's wallet
     */
    addresses: Array<string>;
    /**
     * The number of items to skip before starting to collect the result set
     */
    offset?: number;
    /**
     * Total number of items
     */
    count?: number;
}
/**
 * Model of parameters for API `/transaction/erc20/{contractAddress}`
 */
export interface Transactionerc20ContractAddressParameters {
    BodyTransactionInfoPredifinedDto: BodyTransactionInfoPredifinedDto;
}
export declare type Transactionerc20ContractAddressResponse<TCode extends 200 | 400 | 401 = 200 | 400 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type Transactionerc20TransactionIdResponse<TCode extends 200 | 400 | 401 | 404 = 200 | 400 | 401 | 404, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : any;
/**
 * Model of parameters for API `/transaction/{symbol}`
 */
export interface TransactionSymbolParameters {
    BodyTransactionInfoPredifinedDto: BodyTransactionInfoPredifinedDto;
}
export declare type TransactionSymbolResponse<TCode extends 200 | 400 | 401 = 200 | 400 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type TransactionSymbolTransactionIdResponse<TCode extends 200 | 400 | 404 = 200 | 400 | 404, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : any;
export interface BodyTransactionInfoErc20Dto {
    /**
     * Address of smart-contract of token
     */
    contractAddress: string;
    /**
     * Address from
     */
    from: string;
    /**
     * Address to
     */
    to: string;
    /**
     * Total amount in satoshi
     */
    amount: string;
}
/**
 * Model of parameters for API `/transactionInfo/erc20`
 */
export interface TransactionInfoerc20Parameters {
    BodyTransactionInfoErc20Dto: BodyTransactionInfoErc20Dto;
}
export declare type TransactionInfoerc20Response<TCode extends 200 | 400 | 404 = 200 | 400 | 404, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : any;
export interface BodyTransactionInfoEthDto {
    /**
     * Address which is tied up to user's wallet
     */
    address: string;
    /**
     * Address where user needs to send funds
     */
    to?: string;
    /**
     * Special data for ERC-20 tokens support, for ETH it will be empty
     */
    data?: string;
    /**
     * Total amount in satoshi
     */
    value?: string;
}
/**
 * Model of parameters for API `/transactionInfo/eth`
 */
export interface TransactionInfoethParameters {
    BodyTransactionInfoEthDto: BodyTransactionInfoEthDto;
}
export declare type TransactionInfoethResponse<TCode extends 200 | 400 = 200 | 400, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : any;
export declare type TransactionInfozenResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export declare type TransactionInfotrxResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export declare type EnvironmentfeeInfoSymbolResponse<TCode extends 200 | 400 = 200 | 400, TContentType extends 'type' | 'items' | '$ref' = 'type' | 'items' | '$ref'> = TCode extends 200 ? TContentType extends 'type' ? null : TContentType extends 'items' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : any;
export declare type EnvironmentdustResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export interface BodyPutBalanceErc20Dto {
    /**
     * Address which is tied up to user's wallet
     */
    addresses: Array<string>;
    /**
     * Smart contract addresses
     */
    contractAddresses: Array<string>;
}
/**
 * Model of parameters for API `/balance/erc20`
 */
export interface Balanceerc20Parameters {
    BodyPutBalanceErc20Dto: BodyPutBalanceErc20Dto;
}
export declare type Balanceerc20Response<TCode extends 200 | 400 | 401 | '400 Invalid address' = 200 | 400 | 401 | '400 Invalid address', TContentType extends 'type' | 'items' | '$ref' = 'type' | 'items' | '$ref'> = TCode extends 200 ? TContentType extends 'type' ? null : TContentType extends 'items' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : TCode extends '400 Invalid address' ? TContentType extends '$ref' ? null : any : any;
export interface BodyPutBalanceMosaicDto {
    /**
     * Address to get mosaic balance
     */
    addresses: Array<string>;
}
/**
 * Model of parameters for API `/balance/mosaic`
 */
export interface BalancemosaicParameters {
    BodyPutBalanceMosaicDto: BodyPutBalanceMosaicDto;
}
export declare type BalancemosaicResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends 'type' | 'items' | '$ref' = 'type' | 'items' | '$ref'> = TCode extends 200 ? TContentType extends 'type' ? null : TContentType extends 'items' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export interface BodyPutBalanceEthDto {
    /**
     * Address which is tied up to user's wallet
     */
    addresses: Array<string>;
}
/**
 * Model of parameters for API `/balance/{symbol}`
 */
export interface BalanceSymbolParameters {
    BodyPutBalanceEthDto: BodyPutBalanceEthDto;
}
export declare type BalanceSymbolResponse<TCode extends 200 | 400 | 401 | '400 Invalid address' = 200 | 400 | 401 | '400 Invalid address', TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : TCode extends '400 Invalid address' ? TContentType extends '$ref' ? null : any : any;
export interface BodyUtxoAddressesDto {
    /**
     * Addresses to get utxo
     */
    addresses: Array<string>;
    /**
     * Needed amount
     */
    amount: string;
    /**
     * Satoshis per byte
     */
    satoshisPerByte?: string;
}
/**
 * Model of parameters for API `/utxo/{symbol}`
 */
export interface UtxoSymbolParameters {
    BodyUtxoAddressesDto: BodyUtxoAddressesDto;
}
export declare type UtxoSymbolResponse<TCode extends 200 | 400 | 401 = 200 | 400 | 401, TContentType extends 'type' | 'items' | '$ref' = 'type' | 'items' | '$ref'> = TCode extends 200 ? TContentType extends 'type' ? null : TContentType extends 'items' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export interface CurrencyInfoDto {
    /**
     * Type of currency
     */
    type?: 'fiat' | 'crypto' | 'ERC-20' | 'EOS' | 'NEM' | 'BNB';
    /**
     * Currency symbol
     */
    symbol: string;
    /**
     * Contract address (only for tokens)
     */
    contractAddress?: string;
}
export interface GetExchangeRateParamsDto {
    currencies: Array<CurrencyInfoDto>;
    /**
     * Currency to use for rates
     */
    toCurrency?: string;
    /**
     * Approximate timestamp to return rate to, supported up to now-24hrs (millis)
     */
    timestamp?: number;
}
/**
 * Model of parameters for API `/exchange-rate`
 */
export interface ExchangeRateParameters {
    GetExchangeRateParamsDto: GetExchangeRateParamsDto;
}
export declare type ExchangeRateResponse<TCode extends 200 | 400 = 200 | 400, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : any;
export declare type CurrencyCronsyncRegularResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type CurrencyCronsyncCryptoResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type CurrencyCronsyncTokensResponse<TCode extends 200 | 401 = 200 | 401, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 401 ? TContentType extends '$ref' ? null : any : any;
export declare type SystemCroncheckHealthResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export declare type SystemCroncheckBlockProducersResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export interface PromoAccountDto {
    /**
     * Accounts name
     */
    accountName?: string;
    /**
     * Public key for account (started with "EOS")
     */
    publicKey: string;
    /**
     * Address connected with the account
     */
    address: string;
    /**
     * Address symbol
     */
    symbol: string;
}
export interface AddPromoAddressesParamsDto {
    /**
     * Array of accounts
     */
    accounts?: Array<PromoAccountDto>;
}
/**
 * Model of parameters for API `/promo-campaign/{code}/user`
 */
export interface PromoCampaignCodeUserParameters {
    AddPromoAddressesParamsDto: AddPromoAddressesParamsDto;
}
export declare type PromoCampaignCodeUserResponse<TCode extends 200 | 400 | 403 | 404 | 409 = 200 | 400 | 403 | 404 | 409, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 403 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : TCode extends 409 ? TContentType extends '$ref' ? null : any : any;
export interface PutDdtUserDataRequestDto {
    /**
     * Email or phone
     */
    value: string;
    /**
     * Confirmation code (in base32)
     */
    code: string;
}
/**
 * Model of parameters for API `/ddt/user/data`
 */
export interface DdtuserdataParameters {
    PutDdtUserDataRequestDto: PutDdtUserDataRequestDto;
}
export declare type DdtuserdataResponse<TCode extends 200 | 400 | 403 | 404 = 200 | 400 | 403 | 404, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : TCode extends 400 ? TContentType extends '$ref' ? null : any : TCode extends 403 ? TContentType extends '$ref' ? null : any : TCode extends 404 ? TContentType extends '$ref' ? null : any : any;
export declare type PingResponse<TCode extends 200 = 200, TContentType extends '$ref' = '$ref'> = TCode extends 200 ? TContentType extends '$ref' ? null : any : any;
export declare type InfocoinsupplyResponse<TCode extends 200 = 200, TContentType extends 'application/json' = 'application/json'> = TCode extends 200 ? TContentType extends 'application/json' ? null : any : any;
